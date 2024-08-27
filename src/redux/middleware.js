const bypassUndoMiddleware = (store) => {
    return (next) => (action) => {
        const stateBefore = store.getState();

        // Log the state before action

        // Check if the action is an undo action
        if (action.type === '@@redux-undo/UNDO') {
            const historyLength = stateBefore.tabs.past.length;

            // Allow undo only if there are more than 2 history states
            if (historyLength > 1) {
                return next(action);
            } else {
                return stateBefore;
            }
        } else {
            // Proceed with the action
            const result = next(action);
            const stateAfter = store.getState();
            return result;
        }
    };
};

export default bypassUndoMiddleware;