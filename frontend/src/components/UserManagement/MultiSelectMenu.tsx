// Author: Harshil Shah
import React, {useState} from "react";
import {Menu, MenuButton, MenuButtonProps, MenuItemOption, MenuList, MenuOptionGroup} from "@chakra-ui/react";


const MultiSelectMenu = (props: MultiSelectMenuProps) => {
    const {label, options, buttonProps} = props;

    const [selectedOptions, setSelectedOptions] = useState<string[]>(options.map((option) => option.value));

    return (
        <Menu closeOnSelect={false}>
            {({onClose}) => (
                <>
                    <MenuButton
                        /* eslint-disable @typescript-eslint/ban-ts-comment */
                        // @ts-ignore <MenuButton> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                        type="button"
                        /* eslint-enable @typescript-eslint/ban-ts-comment */
                        backgroundColor={selectedOptions.length ? "purple.200" : "white"}
                        color={selectedOptions.length ? "purple.500" : "gray.600"}
                        borderColor={selectedOptions.length ? "purple.200" : "gray.300"}
                        borderWidth={1}
                        p={2}
                        px={4}
                        borderRadius="10px"
                        _focus={{
                            outline: "none"
                        }}
                        {...buttonProps}
                    >
                        {`${label}${
                            selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""
                        }`}
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup
                            title={undefined}
                            defaultValue={selectedOptions}
                            type="checkbox"
                            /* eslint-disable @typescript-eslint/ban-ts-comment */
                            // @ts-ignore Arguments type is just wrong upstream.
                            onChange={(values: string[]) => {
                                // Filter out empty strings, because, well, this component seems to add
                                // an empty string out of nowhere.
                                setSelectedOptions(values.filter((_) => _.length));
                                props.onChange?.(values);
                            }}
                            /* eslint-enable @typescript-eslint/ban-ts-comment */
                        >
                            {options.map((option) => {
                                return (
                                    // Use 'type'='button' to make sure it doesn't default to 'type'='submit'.
                                    <MenuItemOption
                                        key={`multiselect-menu-${option.value}`}
                                        /* eslint-disable @typescript-eslint/ban-ts-comment */
                                        // @ts-ignore <MenuItemOption> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                                        type="button"
                                        /* eslint-enable @typescript-eslint/ban-ts-comment */
                                        value={option.value}
                                    >
                                        {option.option}
                                    </MenuItemOption>
                                );
                            })}
                        </MenuOptionGroup>
                    </MenuList>
                </>
            )}
        </Menu>
    );
};

MultiSelectMenu.displayName = "MultiSelectMenu";


interface option {
    value: string;
    option: string;
}

export type MultiSelectMenuProps = {
    label: string;
    options: option[];
    onChange?: (selectedValues: string[]) => void;
    buttonProps?: MenuButtonProps;
};

export default MultiSelectMenu;
