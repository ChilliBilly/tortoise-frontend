import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
const API_URL = "https://face-swap.12pmtech.link/api/v1";
export const AUDIO_API_URL = "https://face-swap.12pmtech.link/static";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const api_audio = axios.create({
    baseURL: AUDIO_API_URL,
    headers: {
        "Content-Type": "audio/wav",
    },
});

export const verifyTokenAPI = (token) => {
    return api.get('/users/token/verify', {
        params: {
            token: token,
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};


export const testHistoryData = {
    items: [
        {
            id: 1,
            date: '6-23-2024 01:18',
            description: 'Text to speech 1 [some first text here for display]',
            duration: '0:12'
        },
        {
            id: 2,
            date: '6-23-2024 01:19',
            description: 'Text to speech 2 [some second text here for display]',
            duration: '0:15'
        }
    ]
};

export const testAllHistoryData = {
    items: [
        {
            id: 1,
            date: '6-23-2024 01:18',
            description: 'Text to speech 3 [some first text here for display]',
            duration: '0:12'
        },
        {
            id: 2,
            date: '6-23-2024 01:19',
            description: 'Text to speech 4 [some second text here for display]',
            duration: '0:15'
        }
        ,
        {
            id: 3,
            date: '6-23-2024 01:20',
            description: 'Text to speech 1 [some second text here for display]',
            duration: '0:45'
        }
    ]
};

export const currentChatBoxSession = {
    items: [
        {
            id: 1,
            text: 'Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.\n\nLately, I’ve been noticing how my sentences have a tendency to keep going when I write them onscreen. This goes for concentrated writing as well as correspondence. (Twain probably believed that correspondence, in an ideal world, also demands concentration. But he never used email.) Last week I caught myself packing four conjunctions into a three-line sentence in an email. That’s inexcusable. Since then, I have tried to eschew conjunctions whenever possible. Gone are the commas, the and’s, but’s, and so’s; in are staccato declaratives. Better to read like bad Hemingway than bad Faulkner.\n\nLength–as we all know, and for lack of a more original or effective way of saying it–matters. But (ahem), it’s also a matter of how you use it. Style and length are technically two different things.\n\nTry putting some prose onscreen, though, and they mix themselves up pretty quickly. This has much to do with the time constraints we claim to feel in the digital age. We don’t have time to compose letters and post them anymore–much less pay postage, what with all the banks kinda-sorta losing our money these days–so we blast a few emails. We don’t have time to talk, so we text. We don’t have time to text to specific people, so we update our Facebook status. We don’t have time to write essays, so we blog.\n\nI’m less interested by the superficial reduction of words–i.e. the always charming imho or c u l8r–than the genres in which those communications occur: blogs, texts, tweets, emails. All these interstitial communiques, do they really reflect super brevity that would make Twain proud? Or do they just reflect poorly stylized writing that desperately seeks a clearer form?\n\nI rather think the latter. Clive Thompson wrote last month in the NYT Magazine that constant digital updates, after a day, can begin “to feel like a short story; follow it for a month, and it’s a novel.” He was right to see the bits as part of a larger whole. The words now flying through our digital pipes & ether more or less tend to resemble parts of bigger units, perhaps even familiar genres. But stories and novels have definite conclusions; they also have conventional lengths. Quick, how long is the conventional blog, when you add up all of its posts and comments? How long is the longest email thread you send back and forth on a single topic?\n\nMost important: What exactly are we writing when we’re doing all of this writing? I won’t pretend to coin a whole new term here; I still think the best we can muster is a more fitting analogue. And if we must find an analogue in an existing literary unit, I propose the paragraph. Our constant writing has begun to feel like a neverending digital paragraph. Not a tight, stabbing paragraph from The Sun Also Rises or even a graceful, sometimes-slinking, sometimes-soaring paragraph from Absalom! Absalom!, I mean a convoluted, haphazard, meandering paragraph, something like Kerouac’s original draft of On the Road–only taped together by bytes. And 1 percent as interesting.',
            tabId: 1
        },
        {
            id: 2,
            text: 'This is for short text.!',
            tabId: 2
        },
        {
            id: 3,
            text: 'This is for short text for test.!',
            tabId: 3
        }
    ]
};

export const liveTabName = {
    items: [
        {
            id: 1,
            tabName: "Convert Long Speech",
            tabInSession: false
        },
        {
            id: 2,
            tabName: "Convert Short Speech",
            tabInSession: true
        },
        {
            id: 3,
            tabName: "Test Speech",
            tabInSession: true
        }
    ]
}

export const getHistoryData = (user_id, tab_id) => {
    return api.get(`/users/${user_id}/tabs/${tab_id}/tab_generations/`);
};

export const getAllHistoryData = (user_id) => {
    return api.get(`/users/${user_id}/tab_generations/`);
}

export const getCurrentChatBoxSession = () => {
    return currentChatBoxSession.items;
};

export const getLiveTabName = () => {
    return liveTabName.items;
}

// GET
export const getUser = (id) => api.get(`/users/${id}`);
export const getVoiceList = (user_id) => api.get(`users/${user_id}/voices/`);
export const getLiveTabByUserId = (user_id) => api.get(`/users/${user_id}/tabs`);
export const getChatBoxSession = (user_id, tab_id) => api.get(`/users/${user_id}/tabs/${tab_id}/tab_generations/1st`);
export const getTabGenerationUserAndTabAndGenerationId = (user_id, tab_id, tab_generation_id) => api.get(`/users/${user_id}/tabs/${tab_id}/tab_generations/${tab_generation_id}`);
export const getAudioByFileName = (user_id, audio_file_name) => api_audio.get(`/user/${user_id}/${audio_file_name}`);

// POST
export const createTab = async (tab) => {
    try {
        const response = await api.post(`/users/${tab.user_id}/tabs`, tab);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error("No response received from server");
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error("Error setting up the request");
        }
    }
};


export const createTabGeneration = async (tabGeneration, selectedVoice) => {
    try {
        await api.post(`/users/${tabGeneration.user_id}/tabs/${tabGeneration.tab_id}/tab_generations/`,
            { tab_id: tabGeneration.tab_id, text_entry_content: tabGeneration.text_entry_content, language: selectedVoice.language, voice_id: selectedVoice.id });
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error("No response received from server");
        } else {
            throw new Error("Error setting up the request");
        }
    }
}


// UPDATE
export const updateTabName = async (user_id, tab_id, tab_name) => {
    try {
        const response = await api.put(`/users/${user_id}/tabs/${tab_id}`, { tab_name: tab_name });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error("No response received from server");
        } else {
            throw new Error("Error setting up the request");
        }
    }
}

// DELETE
export const deleteTab = async (user_id, tab_id) => {
    try {
        const response = await api.delete(`/users/${user_id}/tabs/${tab_id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error("No response received from server");
        } else {
            throw new Error("Error setting up the request");
        }
    }
}


export const deleteVoice = async (user_id, voice_id) => api.delete(`/users/${user_id}/voices/${voice_id}`);