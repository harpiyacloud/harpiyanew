import { useSubEnv } from "@harpiya/owl";
import { KanbanController } from "@web/views/kanban/kanban_controller";

export class TimesheetTimerKanbanController extends KanbanController {
    setup() {
        super.setup();
        useSubEnv({
            config: {
                ...this.env.config,
                disableSearchBarAutofocus: true,
            },
        });
    }
}
