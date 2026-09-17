import { registerMenu } from "../../registry"
import { windowLabelMenu } from "./shared"

export { getWindowByLabel, windowLabelArgument } from "./shared"

registerMenu("windowLabelMenu", { acceptReporters: true, items: "windowLabelMenu" }, windowLabelMenu)

import "./reporters"
import "./blocks"
import "./otherWindow/reporters"
import "./otherWindow/blocks"
