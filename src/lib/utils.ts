import { tooltip } from "./store";
import type { Decklist, Card, CardTypeIds } from "./types";

export const format_date = (iso: string, options?: Intl.DateTimeFormatOptions) => {
    const date = new Date(iso);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric'
        ...options
    });
}

export const action = async (
    action: 'download' | 'export',
    id: string,
    format: 'json' | 'txt' | 'otcgn' | 'bbcode' | 'md' | 'jinteki.net'
) => {
    const response = await fetch(
        `/api/decklist/${action}?type=decklist&id=${id}&format=${format}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decklist.${format}`;
    a.click();
    URL.revokeObjectURL(url);
};

export const markdown = (text: string) => {
    return text.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/^#+\s/gm, '\n$&');
}

type CardGroup = {
    type: CardTypeIds;
    data: Card[];
}

export const group_cards_by_type = (cards: Card[]): CardGroup[] => {
    const groups: CardGroup[] = cards.reduce((accumulator: CardGroup[], card: Card) => {
        if (!card?.attributes?.card_type_id) {
            return accumulator;
        }

        const type_id = card.attributes.card_type_id;

        let existing = accumulator.find(item => item.type === type_id);

        if (!existing) {
            accumulator.push({ type: type_id, data: [card] });
        } else {
            existing.data.push(card);
        }

        return accumulator;
    }, []);

    return groups;
}

export const card_quantity = (decklist: Decklist, cards: CardGroup[]) => {
    return cards.reduce((accumulator: Record<string, number>, group: CardGroup) => {
        accumulator[group.type] = group.data
            .map((card: Card & { quantity?: number }) => {
                card.quantity = decklist.attributes.card_slots[card.id] || 0;
                return card;
            })
            .reduce((sum: number, card: Card & { quantity?: number }) => sum + (card.quantity || 0), 0);
        return accumulator;
    }, {});
}