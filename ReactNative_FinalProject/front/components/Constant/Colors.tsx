export interface ColorTheme {
    gradient: [string, string];
    reverseGradient: [string, string];
    statistic_item: string;
    card_title_background: string;
    divider: string,
    fab_color: string,
    modal_header: string,
    background: string,
    text: string,
    textAlt: string,
    tab_icon: string,
    statistic__item_background: string,
    background_light: string,
    buttonMain: string,
    buttonBorderMain: string,
    registerText: string,
    borderColor: string,
    search_icon: string,
    subText: string,
    borderPicker: string,
    textInputBorder: string,
    textActiveInputBorder: string
}

export const LIGHT_COLORS: ColorTheme = {
    gradient: ['#057ab9', '#009eff'],
    buttonBorderMain: '#009eff',
    reverseGradient: ['#009eff', '#057ab9'],
    statistic_item: "#057ab9",
    statistic__item_background: "#FFFFFF",
    card_title_background: '#148BCD',
    divider: '#0EA5E9',
    borderColor: '#0EA5E9',
    fab_color: "#0EA5E9",
    modal_header: "#148BCD",
    background_light: '#FFFFFF',
    background: "#FFFFFF",
    text: "#000000",
    textAlt: '#fff',
    tab_icon: "#2948ff",
    buttonMain: '#ffffff',
    registerText: '#148BCD',
    search_icon: '#2948ff',
    subText: 'rgba(115,115,115,0.7)',
    borderPicker: '#000000',
    textInputBorder: '#d1d5db',
    textActiveInputBorder: '#06B6D4',

};

export const DARK_COLORS: ColorTheme = {
    gradient: ['#151515', '#282828'],
    buttonBorderMain: '#009eff',
    reverseGradient: ['#282828', '#151515'],
    statistic_item: "#151515",
    card_title_background: '#232323',
    statistic__item_background: '#3E3D3D',
    divider: '#0EA5E9',
    borderColor: '#0EA5E9',
    fab_color: "#0EA5E9",
    modal_header: "#148BCD",
    background: "#202020",
    background_light: '#313131',
    text: "#d5d5d5",
    textAlt: '#fff',
    tab_icon: "#0EA5E9",
    buttonMain: '#ffffff',
    registerText: '#0EA5E9',
    search_icon: '#252525',
    subText: 'rgba(255,255,255,0.6)',
    borderPicker: '#FFFFFF',
    textInputBorder: '#d1d5db',
    textActiveInputBorder: '#06B6D4',
};


