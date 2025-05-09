export type SidesIds = "corp" | "runner";
export type FactionIds = "adam" | "anarch" | "apex" | "criminal" | "neutral_corp" | "neutral_runner" | "sunny_lebeau" | "haas_bioroid" | "jinteki" | "nbn" | "shaper" | "weyland_consortium";
export type CardTypeIds = "agenda" | "asset" | "corp_identity" | "event" | "hardware" | "ice" | "operation" | "program" | "resource" | "runner_identity" | "upgrade";

export type SideIds = {
    [key in SidesIds]: Extract<FactionIds, key extends "corp" ? "haas_bioroid" | "jinteki" | "nbn" | "weyland_consortium" | "neutral_corp" : "anarch" | "criminal" | "shaper" | "adam" | "apex" | "sunny_lebeau" | "neutral_runner">;
}

export type ApiResponse<T> = {
    data: T | T[];
    meta: Meta | null;
}

export type Meta = {
    stats?: {
        total: {
            count: number
        }
    }
};

export type Relationship = {
    links: {
        related: string;
    }
}

export type Faction = {
    id: FactionIds;
    type: "factions";
    attributes: {
        name: string;
        description: string;
        is_mini: boolean;
        side_id: string;
        updated_at: string;
    },
    relationships: {
        side: Relationship;
        cards: Relationship;
        decklists: Relationship;
        printings: Relationship;
    },
    links: {
        self: string;
    }
}

export type Card = {
    id: string;
    type: string;
    attributes: {
        stripped_title: string;
        title: string;
        card_type_id: CardTypeIds;
        side_id: string;
        faction_id: string;
        cost: string;
        advancement_requirement: null;
        agenda_points: null;
        base_link: null;
        deck_limit: number;
        in_restriction: true;
        influence_cost: number;
        influence_limit: null;
        memory_cost: null;
        minimum_deck_size: null;
        num_printings: number;
        printing_ids: string[];
        date_release: string;
        restriction_ids: string[];
        strength: number | null;
        stripped_text: string;
        text: string;
        trash_cost: null;
        is_unique: false;
        card_subtype_ids: string[];
        display_subtypes: null;
        attribution: null;
        updated_at: string;
        format_ids: string[];
        card_pool_ids: string[];
        snapshot_ids: string[];
        card_cycle_ids: string[];
        card_cycle_names: string[];
        card_set_ids: string[];
        card_set_names: string[];
        designed_by: string;
        printings_released_by: string[]
        pronouns: null,
        pronunciation_approximation: null,
        pronunciation_ipa: null,
        layout_id: string;
        num_extra_faces: number,
        faces: string[],
        card_abilities: {
            additional_cost: boolean,
            advanceable: boolean,
            gains_subroutines: boolean,
            interrupt: boolean,
            link_provided: null,
            mu_provided: null,
            num_printed_subroutines: null,
            on_encounter_effect: boolean,
            performs_trace: boolean,
            recurring_credits_provided: null,
            rez_effect: boolean,
            trash_ability: boolean
        },
        restrictions: {
            banned: string[],
            global_penalty: [],
            points: {},
            restricted: [],
            universal_faction_cost: {}
        },
        latest_printing_id: string;
    };
    relationships: {
        card_cycles: Relationship;
        card_sets: Relationship;
        card_subtypes: Relationship;
        card_type: Relationship;
        faction: Relationship;
        printings: Relationship;
        rulings: Relationship;
        reviews: Relationship;
        side: Relationship;
        decklists: Relationship;
        card_pools: Relationship;
    };
    links: {
        self: string;
    };
}

export type Printing = {
    id: string;
    type: 'printings';
    attributes: {
        card_id: string;
        card_cycle_id: string;
        card_cycle_name: string;
        card_set_id: string;
        card_set_name: string;
        flavor: string;
        display_illustrators: string;
        illustrator_ids: string[];
        illustrator_names: string[];
        position: number;
        position_in_set: number;
        quantity: number;
        date_release: string;
        updated_at: string;
        stripped_title: string;
        title: string;
        card_type_id: CardTypeIds;
        side_id: string;
        faction_id: string;
        advancement_requirement: string | null;
        cost: number | null;
        agenda_points: number | null;
        base_link: number | null;
        deck_limit: number;
        in_restriction: boolean;
        influence_cost: number | null;
        influence_limit: number | null;
        memory_cost: number | null;
        minimum_deck_size: number | null;
        num_printings: number;
        is_latest_printing: boolean;
        printing_ids: string[];
        restriction_ids: string[];
        strength: number | null;
        stripped_text: string;
        text: string;
        trash_cost: number | null;
        is_unique: boolean;
        card_subtype_ids: string[];
        card_subtype_names: string[];
        display_subtypes: string | null;
        attribution: string | null;
        format_ids: string[];
        card_pool_ids: string[];
        snapshot_ids: string[];
        card_cycle_ids: string[];
        card_cycle_names: string[];
        card_set_ids: string[];
        card_set_names: string[];
        designed_by: string;
        released_by: string;
        printings_released_by: string[];
        pronouns: string | null;
        pronunciation_approximation: string | null;
        pronunciation_ipa: string | null;
        images: {
            nrdb_classic: {
                tiny: string;
                small: string;
                medium: string;
                large: string;
            }
        };
        card_abilities: {
            additional_cost: boolean;
            advanceable: boolean;
            gains_subroutines: boolean;
            interrupt: boolean;
            link_provided: number | null;
            mu_provided: number | null;
            num_printed_subroutines: number | null;
            on_encounter_effect: boolean;
            performs_trace: boolean;
            recurring_credits_provided: number | null;
            rez_effect: boolean;
            trash_ability: boolean;
        };
        latest_printing_id: string;
        restrictions: {
            banned: string[];
            global_penalty: string[];
            points: {
                [key: string]: any
            };
            restricted: string[];
            universal_faction_cost: {
                [key: string]: any
            };
        };
        num_extra_faces: number;
        faces: string[];
    };
    relationships: {
        card: Relationship;
        card_cycle: Relationship;
        card_set: Relationship;
        card_type: Relationship;
        faction: Relationship;
        side: Relationship;
        card_subtypes: Relationship;
        illustrators: Relationship;
        card_pools: Relationship;
    };
    links: {
        self: string;
    }
};

export type Decklist = {
    id: string;
    type: 'decklists';
    attributes: {
        user_id: string;
        follows_basic_deckbuilding_rules: boolean;
        identity_card_id: string;
        name: string;
        notes: string;
        tags: string;
        side_id: string;
        created_at: string;
        updated_at: string;
        faction_id: string;
        card_slots: {
            [key: string]: number;
        },
        num_cards: number;
        influence_spent: number;
    };
    relationships: {
        side: Relationship;
        faction: Relationship;
        cards: Relationship;
    };
    links: {
        self: string;
    };
}

export type Comment = {
    id: number;
    body: string;
    user: string;
    created_at: string;
    updated_at: string;
}

// TODO: Define the structure of a review
export type Review = any;

export type Rulings = {
    id: string;
    type: "rulings",
    attributes: {
        card_id: string;
        nsg_rules_team_verified: boolean,
        question: string;
        answer: string;
        text_ruling: string | null,
        updated_at: string;
    },
    relationships: {
        card: Relationship;
    },
    links: {
        self: string;
    };
}

export type CardType = {
    id: string;
    type: "card_types",
    attributes: {
        name: string;
        updated_at: string;
    },
    relationships: {
        side: Relationship;
        cards: Relationship;
        printings: Relationship;
    },
    links: {
        self: string;
    };
}