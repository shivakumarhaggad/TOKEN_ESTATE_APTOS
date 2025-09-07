// sources/real_estate_tokenizer.move
module real_estate::real_estate_tokenizer {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::event;

    // Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_PROPERTY_NOT_FOUND: u64 = 2;
    const E_INSUFFICIENT_FUNDS: u64 = 3;
    const E_INVALID_FRACTIONAL_SHARE: u64 = 4;
    const E_LEASE_EXPIRED: u64 = 5;
    const E_NOT_INITIALIZED: u64 = 6;

    // Property structure
    struct Property has store, drop, copy {
        id: u64,
        owner: address,
        name: String,
        description: String,
        location: String,
        total_value: u64,
        total_tokens: u64,
        available_tokens: u64,
        is_tokenized: bool,
        created_at: u64,
        property_type: String, // "residential", "commercial", "industrial"
    }

    // Fractional ownership structure
    struct FractionalShare has store, drop, copy {
        property_id: u64,
        owner: address,
        shares: u64,
        purchase_price: u64,
        purchase_date: u64,
    }

    // Lease contract structure
    struct LeaseContract has store, drop, copy {
        property_id: u64,
        landlord: address,
        tenant: address,
        monthly_rent: u64,
        security_deposit: u64,
        lease_start: u64,
        lease_end: u64,
        is_active: bool,
    }

    // Global registry
    struct PropertyRegistry has key {
        properties: vector<Property>,
        next_property_id: u64,
        total_properties: u64,
    }

    // Fractional ownership registry
    struct FractionalRegistry has key {
        shares: vector<FractionalShare>,
    }

    // Lease registry
    struct LeaseRegistry has key {
        leases: vector<LeaseContract>,
    }

    // Events
    #[event]
    struct PropertyTokenized has drop, store {
        property_id: u64,
        owner: address,
        name: String,
        total_value: u64,
        total_tokens: u64,
    }

    #[event]
    struct SharesPurchased has drop, store {
        property_id: u64,
        buyer: address,
        shares: u64,
        total_cost: u64,
    }

    #[event]
    struct LeaseCreated has drop, store {
        property_id: u64,
        landlord: address,
        tenant: address,
        monthly_rent: u64,
    }

    // Initialize the module
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        
        if (!exists<PropertyRegistry>(admin_addr)) {
            move_to(admin, PropertyRegistry {
                properties: vector::empty(),
                next_property_id: 1,
                total_properties: 0,
            });
        };

        if (!exists<FractionalRegistry>(admin_addr)) {
            move_to(admin, FractionalRegistry {
                shares: vector::empty(),
            });
        };

        if (!exists<LeaseRegistry>(admin_addr)) {
            move_to(admin, LeaseRegistry {
                leases: vector::empty(),
            });
        };
    }

    // Tokenize a property
    public entry fun tokenize_property(
        owner: &signer,
        name: String,
        description: String,
        location: String,
        total_value: u64,
        total_tokens: u64,
        property_type: String,
    ) acquires PropertyRegistry {
        let owner_addr = signer::address_of(owner);
        
        // Check if registry exists
        assert!(exists<PropertyRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let registry = borrow_global_mut<PropertyRegistry>(@real_estate);
        
        let property = Property {
            id: registry.next_property_id,
            owner: owner_addr,
            name,
            description,
            location,
            total_value,
            total_tokens,
            available_tokens: total_tokens,
            is_tokenized: true,
            created_at: timestamp::now_seconds(),
            property_type,
        };

        // Emit event
        event::emit(PropertyTokenized {
            property_id: property.id,
            owner: owner_addr,
            name: property.name,
            total_value,
            total_tokens,
        });

        vector::push_back(&mut registry.properties, property);
        registry.next_property_id = registry.next_property_id + 1;
        registry.total_properties = registry.total_properties + 1;
    }

    // Purchase fractional shares
    public entry fun purchase_fractional_share(
        investor: &signer,
        property_id: u64,
        shares_to_buy: u64,
    ) acquires PropertyRegistry, FractionalRegistry {
        let investor_addr = signer::address_of(investor);
        
        assert!(exists<PropertyRegistry>(@real_estate), E_NOT_INITIALIZED);
        assert!(exists<FractionalRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let property_registry = borrow_global_mut<PropertyRegistry>(@real_estate);
        let fractional_registry = borrow_global_mut<FractionalRegistry>(@real_estate);

        // Find and update property
        let i = 0;
        let property_found = false;
        let property_len = vector::length(&property_registry.properties);
        
        while (i < property_len) {
            let property = vector::borrow_mut(&mut property_registry.properties, i);
            if (property.id == property_id) {
                assert!(property.available_tokens >= shares_to_buy, E_INSUFFICIENT_FUNDS);
                
                let share_price = property.total_value / property.total_tokens;
                let total_cost = share_price * shares_to_buy;

                // Create fractional share
                let fractional_share = FractionalShare {
                    property_id,
                    owner: investor_addr,
                    shares: shares_to_buy,
                    purchase_price: total_cost,
                    purchase_date: timestamp::now_seconds(),
                };

                // Emit event
                event::emit(SharesPurchased {
                    property_id,
                    buyer: investor_addr,
                    shares: shares_to_buy,
                    total_cost,
                });

                property.available_tokens = property.available_tokens - shares_to_buy;
                vector::push_back(&mut fractional_registry.shares, fractional_share);
                property_found = true;
                break
            };
            i = i + 1;
        };

        assert!(property_found, E_PROPERTY_NOT_FOUND);
    }

    // Create lease contract
    public entry fun create_lease_contract(
        landlord: &signer,
        property_id: u64,
        tenant_addr: address,
        monthly_rent: u64,
        security_deposit: u64,
        lease_duration_months: u64,
    ) acquires PropertyRegistry, LeaseRegistry {
        let landlord_addr = signer::address_of(landlord);
        
        assert!(exists<PropertyRegistry>(@real_estate), E_NOT_INITIALIZED);
        assert!(exists<LeaseRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let lease_registry = borrow_global_mut<LeaseRegistry>(@real_estate);
        let property_registry = borrow_global<PropertyRegistry>(@real_estate);

        // Verify landlord owns the property
        let i = 0;
        let property_len = vector::length(&property_registry.properties);
        let is_owner = false;
        
        while (i < property_len) {
            let property = vector::borrow(&property_registry.properties, i);
            if (property.id == property_id && property.owner == landlord_addr) {
                is_owner = true;
                break
            };
            i = i + 1;
        };

        assert!(is_owner, E_NOT_AUTHORIZED);

        let lease_start = timestamp::now_seconds();
        let lease_end = lease_start + (lease_duration_months * 30 * 24 * 60 * 60); // Approximate

        let lease_contract = LeaseContract {
            property_id,
            landlord: landlord_addr,
            tenant: tenant_addr,
            monthly_rent,
            security_deposit,
            lease_start,
            lease_end,
            is_active: true,
        };

        // Emit event
        event::emit(LeaseCreated {
            property_id,
            landlord: landlord_addr,
            tenant: tenant_addr,
            monthly_rent,
        });

        vector::push_back(&mut lease_registry.leases, lease_contract);
    }

    // View functions
    #[view]
    public fun get_property_details(property_id: u64): (String, String, String, u64, u64, u64) acquires PropertyRegistry {
        assert!(exists<PropertyRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let registry = borrow_global<PropertyRegistry>(@real_estate);
        let i = 0;
        let property_len = vector::length(&registry.properties);
        
        while (i < property_len) {
            let property = vector::borrow(&registry.properties, i);
            if (property.id == property_id) {
                return (property.name, property.description, property.location, 
                       property.total_value, property.total_tokens, property.available_tokens)
            };
            i = i + 1;
        };
        
        // Return empty values if not found
        (string::utf8(b""), string::utf8(b""), string::utf8(b""), 0, 0, 0)
    }

    #[view]
    public fun get_all_properties(): vector<Property> acquires PropertyRegistry {
        assert!(exists<PropertyRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let registry = borrow_global<PropertyRegistry>(@real_estate);
        registry.properties
    }

    #[view]
    public fun get_user_shares(user_addr: address): vector<FractionalShare> acquires FractionalRegistry {
        assert!(exists<FractionalRegistry>(@real_estate), E_NOT_INITIALIZED);
        
        let registry = borrow_global<FractionalRegistry>(@real_estate);
        let user_shares = vector::empty<FractionalShare>();
        let i = 0;
        let shares_len = vector::length(&registry.shares);
        
        while (i < shares_len) {
            let share = vector::borrow(&registry.shares, i);
            if (share.owner == user_addr) {
                vector::push_back(&mut user_shares, *share);
            };
            i = i + 1;
        };
        
        user_shares
    }

    #[view]
    public fun get_property_count(): u64 acquires PropertyRegistry {
        if (!exists<PropertyRegistry>(@real_estate)) {
            return 0
        };
        
        let registry = borrow_global<PropertyRegistry>(@real_estate);
        registry.total_properties
    }
}