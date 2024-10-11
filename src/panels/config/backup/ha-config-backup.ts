import { PropertyValues } from "lit";
import { customElement, property } from "lit/decorators";
import {
  HassRouterPage,
  RouterOptions,
} from "../../../layouts/hass-router-page";
import { HomeAssistant } from "../../../types";
import "./ha-config-backup-dashboard";

@customElement("ha-config-backup")
class HaConfigBackup extends HassRouterPage {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ type: Boolean }) public isWide = false;

  @property({ type: Boolean }) public showAdvanced = false;

  protected routerOptions: RouterOptions = {
    defaultPage: "dashboard",
    routes: {
      dashboard: {
        tag: "ha-config-backup-dashboard",
        cache: true,
      },
      list: {
        tag: "ha-config-backup-list",
        load: () => import("./ha-config-backup-list"),
      },
      details: {
        tag: "ha-config-backup-details",
        load: () => import("./ha-config-backup-details"),
      },
    },
  };

  protected updatePageEl(pageEl, changedProps: PropertyValues) {
    pageEl.hass = this.hass;
    pageEl.narrow = this.narrow;
    pageEl.isWide = this.isWide;
    pageEl.route = this.routeTail;
    pageEl.showAdvanced = this.showAdvanced;

    if (
      (!changedProps || changedProps.has("route")) &&
      this._currentPage === "details"
    ) {
      pageEl.backupSlug = this.routeTail.path.substr(1);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-backup": HaConfigBackup;
  }
}
