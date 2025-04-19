import { createI18n } from "@inlang/paraglide-sveltekit"
import * as runtime from "$lib/paraglide/runtime.js"
import * as m from '$lib/paraglide/messages';

export const i18n = createI18n(runtime, {
    defaultLanguageTag: "en",
    prefixDefaultLanguage: "always",
    pathnames: {
        // TODO: Populate this with all routes and translations
        "/search": {
            en: "/search",
            de: "/suche",
            es: "/busque-en",
            pt: "/pesquisa",
            pl: "/wyszukiwanie",
            fr: "/recherche",
        },
        "/cards/[id]": {
            en: "/cards/[id]",
            de: "/karten/[id]",
            es: "/tarjetas/[id]",
            pt: "/cartões/[id]",
            pl: "/karty/[id]",
            fr: "/cartes/[id]",
        },
        "/decklist/[id]": {
            en: "/decklist/[id]",
            de: "/dacklista/[id]",
            es: "/lista-de-mazos/[id]",
            pt: "/lista-de-deck/[id]",
            pl: "/decklista/[id]",
            fr: "/liste-de-controle/[id]",
        },
        "/faction/[name]": {
            en: "/faction/[name]",
            de: "/fraktion/[name]",
            es: "/facción/[name]",
            pt: "/fação/[name]",
            pl: "/frakcja/[name]",
            fr: "/faction/[name]",
        },
        "/illustrators": {
            en: "/illustrators",
            de: "/Illustratoren",
            es: "/ilustradores",
            pt: "/ilustradores",
            pl: "/ilustratorzy",
            fr: "/illustrateurs",
        },
        "/illustrators/[name]": {
            en: "/illustrators/[name]",
            de: "/Illustratoren/[name]",
            es: "/ilustradores/[name]",
            pt: "/ilustradores/[name]",
            pl: "/ilustratorzy/[name]",
            fr: "/illustrateurs/[name]",
        }
    }
})

export const locale = (value: string, parameter?: string) => {
    const locales: Record<string, string> = {
        // Sides
        runner: m.runner(),
        corp: m.corp(),
        runner_identity: m.runner_identity(),
        corp_identity: m.corp_identity(),

        // Factions
        adam: m.adam(),
        anarch: m.anarch(),
        apex: m.apex(),
        criminal: m.criminal(),
        neutral_corp: m.neutral_corp(),
        neutral_runner: m.neutral_runner(),
        sunny_lebeau: m.sunny_lebeau(),
        haas_bioroid: m.haas_bioroid(),
        jinteki: m.jinteki(),
        nbn: m.nbn(),
        shaper: m.shaper(),
        weyland_consortium: m.weyland_consortium(),

        // Types
        agenda: m.agenda(),
        asset: m.asset(),
        event: m.event(),
        hardware: m.hardware(),
        ice: m.ice(),
        operation: m.operation(),
        program: m.program(),
        resource: m.resource(),
        upgrade: m.upgrade(),
        subroutine: m.subroutine(),

        // Designers
        null_signal_games: m.null_signal_games(),
        fantasy_flight_games: m.fantasy_flight_games(),

        // Misc
        quantity: m.quantity(),
        name: m.name(),
        influence: m.influence(),
        faction: m.faction(),
        type: m.type(),
        subtype: m.subtype(),
        cost: m.cost(),
        strength: m.strength(),
        rulings: m.rulings(),
        reviews: m.reviews(),
        publisher: m.publisher(),
        legality: m.legality(),
        cards: m.cards(),
        release_date: m.release_date(),
        cycle: m.cycle(),
        set: m.set(),
        trash: m.trash(),

        // Example
        // example: m.example(parameter),
    }

    return locales[value] || value;
}