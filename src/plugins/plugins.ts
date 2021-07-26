import ChartJS from "chart.js";
import XM_Dropdown from "@/scripts/vendor/xm_dropdown.min.js";
import XM_Hexagon from "@/scripts/vendor/xm_hexagon.min.js"
import XM_Tab from "@/scripts/vendor/xm_tab.min.js"
import XM_Popup from "@/scripts/vendor/xm_popup.min.js"
import XM_Tooltip from "@/scripts/vendor/xm_tooltip.min.js"

import { tns } from 'tiny-slider/src/tiny-slider';

const existsInDOM = function (selector: any) {
    return document.querySelectorAll(selector).length;
};

const plugins = {

    createDropdown: function (options: any) {
        if ((
            (existsInDOM(options.container) || typeof options.containerElement !== 'undefined') && options.controlToggle) || ((existsInDOM(options.trigger) || typeof options.triggerElement !== 'undefined') && (existsInDOM(options.container) || typeof options.containerElement !== 'undefined'))) {
            //@ts-ignore       
            return new XM_Dropdown(options);
        }
    },
    createHexagon: function (options: any) {
        if (existsInDOM(options.container) || typeof options.containerElement !== 'undefined') {
            return new XM_Hexagon(options);
        }
    },
    createTab: function (options: any) {
        if (existsInDOM(options.triggers) && existsInDOM(options.elements)) {
            //@ts-ignore       
            return new XM_Tab(options);
        }
    },
    createPopup: function (options: any) {
        if (existsInDOM(options.container) && existsInDOM(options.trigger)) {
            //@ts-ignore       
            return new XM_Popup(options);
        }
    },
    createTooltip: function (options: any) {
        if (existsInDOM(options.container)) {
            //@ts-ignore       
            return new XM_Tooltip(options);
        }
    },
    createSlider: function (options) {
        if (existsInDOM(options.container)) {
            return tns(options);
        }
    },
    createChart: function (ctx, options) {
        return new ChartJS(ctx, options);
    }
}

export default plugins;