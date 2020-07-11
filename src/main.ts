/******************************************************************************/
//Template Interaction Plugin
//(c) 2020 Ignatkovich Valery(typescript version) Benjamin Zachey(original),
/******************************************************************************/
import * as tvx from './tvx-plugin-module.min';
import $ from "jquery";

class InteractionPlugin {
    private logger = tvx.services.logger;

    init() {
        this.logger.registerControl($('#log'));
        this.logger.debug("Init");
    }

    ready() {
        this.logger.debug("Ready");
        tvx.interactionPlugin.success("Template handler ready.");
    }

    handleEvent(data: any) {
        this.logger.debug("Handle event: " + tvx.tools.serialize(data));
    }

    handleData(dataId: string, data: any, callback: any) {
        this.logger.debug("Handle data: " + tvx.tools.serialize(data));
    }

    handleRequest(dataId: string, data: any, callback: any) {
        this.logger.debug("Handle request: " + dataId);
        this.logger.debug("Request data: " + tvx.tools.serialize(data));
        callback(null);
    };
}
/******************************************************************************/

/******************************************************************************/
//Setup
/******************************************************************************/
window.onload = function () {
    tvx.interactionPlugin.setupHandler(new InteractionPlugin());
    tvx.interactionPlugin.init();
};
/******************************************************************************/

