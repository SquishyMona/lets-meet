import { CustomFlowbiteTheme } from "flowbite-react";
export const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    "arrowIcon": "ml-2 h-4 w-4",
    "content": "py-1 focus:outline-none",
    "floating": {
        "animation": "transition-opacity",
        "arrow": {
            "base": "absolute z-10 h-2 w-2 rotate-45",
            "style": {
                "dark": "bg-zinc-900 dark:bg-zinc-700",
                "light": "bg-white",
                "auto": "bg-white dark:bg-zinc-700"
            },
            "placement": "-4px"
        },
        "base": "z-10 w-fit divide-y divide-zinc-100 rounded-2xl shadow focus:outline-none",
        "content": "py-1 text-sm text-zinc-700 dark:text-zinc-200",
        "divider": "my-1 h-px bg-zinc-100 dark:bg-zinc-600",
        "header": "block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200",
        "hidden": "invisible opacity-0",
        "item": {
            "container": "",
            "base": "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-600 dark:hover:text-white dark:focus:bg-zinc-600 dark:focus:text-white",
            "icon": "mr-2 h-4 w-4"
        },
        "style": {
            "dark": "bg-zinc-900 text-white dark:bg-zinc-700",
            "light": "border border-zinc-200 bg-white text-zinc-900",
            "auto": "border border-zinc-200 bg-white text-zinc-900 dark:border-none dark:bg-zinc-700 dark:text-white"
        },
        "target": "w-fit"
    },
    "inlineWrapper": "flex items-center"
}
