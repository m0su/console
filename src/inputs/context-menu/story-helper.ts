import type { ArgTypes } from '@storybook/addons';

import { getContextMenuItemArgTypes } from '@/inputs/context-menu/context-menu-item/story-helper';

export const contextMenuSlots: [string, string][] = [
    ['menu', 'A slot that replaces the whole context menu. It\'s useful when you want to use context menu\'s container style, no data & loading container only.'],
    ['items', 'A slot that replaces the area for menu items. This is useful when you want to directly combine and use context menu items in a compound component way.'],
    ['bottom', 'A slot that replaces the bottom area of the context menu.'],
    ['no-data-format', 'A slot that replaces the inner area of the no-data container. It replaces style of the entire corresponding slot area.'],
    ['item--format', 'A slot used when customizing each menu item whose type is \'item\' type with default style applied. This leads directly to the default slot of ContextMenuItem.'],
    // eslint-disable-next-line max-len
    ['item-text-list', 'A slot used when customizing each menu item whose type is \'item\' type with default style applied. This leads directly to the text-list slot of ContextMenuItem. This works only when the highlightTerm is given.'],
    ['header-{item.name}', 'A slot that replaces the inner area of a menu item whose type is \'header\' with a specific name.'],
    ['help-text', 'A slot used when you want to put additional information on the top.'],
];

const contextMenuEvents: [string, string][] = [
    ['<item.name>:select', 'This event is emitted when a specific item is selected. As arguments, index and click event are passed. This event will be deprecated, so don\'t use it.'],
    ['select', 'This event is emitted when a specific item is selected. As arguments, item name and index are passed'],
    ['focus', 'This event is emitted when item is focused. As arguments, index of item is passed'],
    ['blur', 'This event is emitted when item is blurred.'],
    ['keyup:up:end', 'This event is emitted when a menu item is tracked through the arrow up key, and the down key is pressed at the first menu item.'],
    ['keyup:down:end', 'This event is emitted when a menu item is tracked through the arrow down key, and the down key is pressed at the last menu item.'],
    ['keyup:esc', 'This event is emitted when a esc key is pressed.'],
    ['click-button', 'This event is emitted when the button(in the item whose type is button) is clicked. As arguments, item, index and click event will be passed.'],
    ['click-done', 'This event is emitted when the done-button(in multi-selectable case) is clicked.'],
];

const getArgTypes = (category: string, info: [string, string][]) => {
    const argTypes: ArgTypes = {};
    info.forEach(([argName, argDescription]) => {
        let name = argName;
        if (category === 'slots') name = `${argName}Slot`;
        else if (category === 'events') name = `on${argName[0].toUpperCase()}${argName.slice(1)}`;
        argTypes[name] = {
            name: argName,
            description: argDescription,
            defaultValue: null,
            table: {
                type: {
                    summary: null,
                },
                category,
                defaultValue: {
                    summary: null,
                },
            },
        };
    });
    return argTypes;
};

export const getContextMenuArgTypes = (): ArgTypes => {
    const contextMenuItemArgTypes = getContextMenuItemArgTypes();
    return {
        menu: {
            name: 'menu',
            type: { name: 'array' },
            description: 'Menu items',
            defaultValue: [],
            table: {
                type: {
                    summary: 'array',
                },
                category: 'props',
                defaultValue: {
                    summary: '[]',
                },
            },
            control: {
                type: 'object',
            },
        },
        loading: {
            name: 'loading',
            type: { name: 'boolean' },
            description: 'Loading state.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        selected: {
            name: 'selected',
            type: { name: 'array' },
            description: 'Array of selected menu item.',
            defaultValue: [{ name: 'collect' }],
            table: {
                type: {
                    summary: 'array',
                },
                category: 'props',
                defaultValue: {
                    summary: '[]',
                },
            },
            control: {
                type: 'object',
            },
        },
        multiSelectable: {
            name: 'multiSelectable',
            type: { name: 'boolean' },
            description: 'Whether to select multiple items or not.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        showRadioIcon: {
            name: 'showRadioIcon',
            type: { name: 'boolean' },
            description: 'Whether to show radio button icon or not.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        strictSelectMode: {
            name: 'strictSelectMode',
            type: { name: 'boolean' },
            description: 'Determines whether all items received as `selected` prop are considered selected, or selected only when they match the names of menu items.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        itemHeightFixed: {
            name: 'itemHeightFixed',
            type: { name: 'boolean' },
            description: 'Determines whether to make all items\' height fixed or not. If it\'s `true`, item text overflow will be ellipsis.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        highlightTerm: contextMenuItemArgTypes.highlightTerm,
        noSelectIndication: {
            name: 'noSelectIndication',
            type: { name: 'boolean' },
            description: 'Whether to display selected state to selected item or not.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        showSelectHeader: {
            name: 'showSelectHeader',
            type: { name: 'boolean' },
            description: 'Whether to activate the selection header that is activated when the value of multiSelectable is true.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        showClearSelection: {
            name: 'showClearSelection',
            type: { name: 'boolean' },
            description: 'Whether to enable a button to deselect all selected items. It is activated when the value of multiSelectable is true.',
            defaultValue: false,
            table: {
                type: {
                    summary: 'boolean',
                },
                category: 'props',
                defaultValue: {
                    summary: 'false',
                },
            },
            control: {
                type: 'boolean',
            },
        },
        ...getArgTypes('slots', contextMenuSlots),
        ...getArgTypes('events', contextMenuEvents),
    };
};
