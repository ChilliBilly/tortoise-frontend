export const CREATE_NEW_TAB = 'CREATE_NEW_TAB';
export const CHANGE_TAB = 'CHANGE_TAB';
export const INIT_APP = 'INIT_APP';
export const SELECT_GENERATION = "SELECT_GENERATION";
export const DELETE_TAB = "DELETE_TAB"


export const initApp = (tabs, initialSessions) => ({
    type: INIT_APP,
    payload: { tabs, initialSessions },
});

export const createNewTab = (newTab, newTabId, initialSessions) => ({
    type: CREATE_NEW_TAB,
    payload: { newTab, newTabId, initialSessions },
});

export const changeTab = (tabId, sessions) => ({
    type: CHANGE_TAB,
    payload: { tabId, sessions },
});

export const selectGeneration = (tabId, sessions) => ({
    type: SELECT_GENERATION,
    payload: { tabId, sessions }
})

export const deleteExistingTab = (tabId) => ({
    type: DELETE_TAB,
    payload: { tabId }
})