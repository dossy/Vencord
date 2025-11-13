/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { PluginOptionString } from "@utils/types";
import { React, TextArea, TextInput, useState } from "@webpack/common";

import { resolveError, SettingProps, SettingsSection } from "./Common";

export function TextSetting({ option, pluginSettings, definedSettings, id, onChange }: SettingProps<PluginOptionString>) {
    const [state, setState] = useState(pluginSettings[id] ?? option.default ?? null);
    const [error, setError] = useState<string | null>(null);

    function handleChange(newValue: string) {
        const isValid = option.isValid?.call(definedSettings, newValue) ?? true;

        setState(newValue);
        setError(resolveError(isValid));

        if (isValid === true) {
            onChange(newValue);
        }
    }

    return (
        <SettingsSection name={id} description={option.description} error={error}>
            {!option.componentProps?.multiline
                ? <TextInput
                    type="text"
                    placeholder={option.placeholder ?? "Enter a value"}
                    value={state}
                    onChange={handleChange}
                    maxLength={null}
                    disabled={option.disabled?.call(definedSettings) ?? false}
                    {...option.componentProps}
                />
                : <TextArea
                    style={{
                        // textArea-2CLwUE:
                        // background-color: "transparent",
                        // resize: "none",
                        border: "none",
                        // @ts-expect-error
                        "-webkit-appearance": "none",
                        "-moz-appearance": "none",
                        appearance: "none",
                        "-webkit-box-sizing": "border-box",
                        "box-sizing": "border-box",
                        "font-weight": 400,
                        "font-size": "1rem",
                        "line-height": "1.375rem",
                        width: "100%",
                        // height: "44px",
                        "min-height": "44px",
                        color: "var(--text-normal)",
                        // "padding-left": 0,
                        // "padding-right": "10px",
                        // fontSize16Padding-XoMpjI:
                        "padding-bottom": "11px",
                        "padding-top": "11px",
                        // textAreaWithoutAttachmentButton-1as0NS:
                        "padding-left": "16px",
                        // additional styles:
                        background: "var(--input-background)",
                        resize: "vertical"
                    }}
                    value={state}
                    onChange={handleChange}
                    placeholder={option.placeholder ?? "Enter a value"}
                    disabled={option.disabled?.call(definedSettings) ?? false}
                    {...option.componentProps}
                />}
        </SettingsSection>
    );
}
