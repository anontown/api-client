import * as api from '@anontown/api-types';
import { Observable } from 'rxjs';
export declare class AtError {
    statusCode: number;
    type: string;
    errors: {
        message: string;
        data: any;
    }[];
    constructor(statusCode: number, type: string, errors: {
        message: string;
        data: any;
    }[]);
}
export interface APIConfig {
    httpOrigin: string;
    socketOrigin: string;
}
export declare const defaltConfig: APIConfig;
export interface AuthToken {
    id: string;
    key: string;
}
export interface AuthUser {
    id: string;
    pass: string;
}
export interface TokenMaster {
    type: "master";
    id: string;
    key: string;
}
export interface TokenGeneral {
    type: "general";
    id: string;
    key: string;
}
export declare type Token = TokenMaster | TokenGeneral;
export declare class API {
    private config;
    constructor(config?: APIConfig);
    private toAuthToken;
    private stream;
    private request;
    createRes(authToken: Token, params: {
        topic: string;
        name: string | null;
        text: string;
        reply: string | null;
        profile: string | null;
        age: boolean;
    }): Promise<api.Res>;
    findResOne(authToken: Token | null, params: {
        id: string;
    }): Promise<api.Res>;
    findResIn(authToken: Token | null, params: {
        ids: string[];
    }): Promise<api.Res[]>;
    findRes(authToken: Token | null, params: {
        type: "gt" | "lt" | "gte" | "lte";
        date: string;
        limit: number;
        query: {
            topic?: string;
            notice?: boolean;
            hash?: string;
            reply?: string;
            profile?: string;
            self?: boolean;
            text?: string;
        };
    }): Promise<api.Res[]>;
    uvRes(authToken: Token, params: {
        id: string;
    }): Promise<api.Res>;
    dvRes(authToken: Token, params: {
        id: string;
    }): Promise<api.Res>;
    cvRes(authToken: Token, params: {
        id: string;
    }): Promise<api.Res>;
    delRes(authToken: Token, params: {
        id: string;
    }): Promise<api.Res>;
    createTopicNormal(authToken: Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Promise<api.TopicNormal>;
    createTopicOne(authToken: Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Promise<api.TopicOne>;
    createTopicFork(authToken: Token, params: {
        title: string;
        parent: string;
    }): Promise<api.TopicFork>;
    findTopicOne(params: {
        id: string;
    }): Promise<api.Topic>;
    findTopicIn(params: {
        ids: string[];
    }): Promise<api.Topic[]>;
    findTopicTags(params: {
        limit: number;
    }): Promise<{
        name: string;
        count: number;
    }[]>;
    findTopic(params: {
        title: string;
        tags: string[];
        skip: number;
        limit: number;
        activeOnly: boolean;
    }): Promise<api.Topic[]>;
    findTopicFork(params: {
        parent: string;
        skip: number;
        limit: number;
        activeOnly: boolean;
    }): Promise<api.TopicFork[]>;
    updateTopic(authToken: Token, params: {
        id: string;
        title: string;
        tags: string[];
        text: string;
    }): Promise<api.TopicNormal>;
    findHistoryOne(params: {
        id: string;
    }): Promise<api.History>;
    findHistoryIn(params: {
        ids: string[];
    }): Promise<api.History[]>;
    findHistoryAll(params: {
        topic: string;
    }): Promise<api.History[]>;
    findMsgOne(authToken: Token, params: {
        id: string;
    }): Promise<api.Msg>;
    findMsgIn(authToken: Token, params: {
        ids: string[];
    }): Promise<api.Msg[]>;
    findMsg(authToken: Token, params: {
        type: "gt" | "lt" | "gte" | "lte";
        date: string;
        limit: number;
    }): Promise<api.Msg[]>;
    createProfile(authToken: Token, params: {
        name: string;
        text: string;
        sn: string;
    }): Promise<api.Profile>;
    findProfileOne(authToken: Token | null, params: {
        id: string;
    }): Promise<api.Profile>;
    findProfileIn(authToken: Token | null, params: {
        ids: string[];
    }): Promise<api.Profile[]>;
    findProfileAll(authToken: Token): Promise<api.Profile[]>;
    updateProfile(authToken: Token, params: {
        id: string;
        name: string;
        text: string;
        sn: string;
    }): Promise<api.Profile>;
    findTokenOne(authToken: TokenMaster): Promise<api.TokenMaster>;
    findTokenOne(authToken: TokenGeneral): Promise<api.TokenGeneral>;
    findTokenOne(authToken: Token): Promise<api.Token>;
    findTokenAll(authToken: TokenMaster): Promise<api.Token[]>;
    deleteTokenClient(authToken: TokenMaster, params: {
        client: string;
    }): Promise<void>;
    createTokenMaster(authUser: AuthUser): Promise<api.TokenMaster>;
    createTokenGeneral(authToken: TokenMaster, params: {
        client: string;
    }): Promise<api.TokenGeneral>;
    setStorage(authToken: Token, params: {
        key: string;
        value: string;
    }): Promise<void>;
    getStorage(authToken: Token, params: {
        key: string;
    }): Promise<string>;
    delStorage(authToken: Token, params: {
        key: string;
    }): Promise<void>;
    listStorage(authToken: Token): Promise<string[]>;
    createTokenReq(authToken: Token): Promise<api.TokenReq>;
    findTokenReq(params: {
        id: string;
        key: string;
    }): Promise<api.TokenGeneral>;
    findUserID(params: {
        sn: string;
    }): Promise<string>;
    findUserSN(params: {
        id: string;
    }): Promise<string>;
    createUser(recaptcha: string, params: {
        sn: string;
        pass: string;
    }): Promise<api.User>;
    updateUser(authUser: AuthUser, params: {
        pass: string;
        sn: string;
    }): Promise<api.User>;
    createClient(authToken: TokenMaster, params: {
        name: string;
        url: string;
    }): Promise<api.Client>;
    updateClient(authToken: TokenMaster, params: {
        id: string;
        name: string;
        url: string;
    }): Promise<api.Client>;
    findClientOne(authToken: TokenMaster | null, params: {
        id: string;
    }): Promise<api.Client>;
    findClientIn(authToken: TokenMaster | null, params: {
        ids: string[];
    }): Promise<api.Client[]>;
    findClientAll(authToken: TokenMaster): Promise<api.Client[]>;
    authUser(authUser: AuthUser): Promise<void>;
    streamUpdateTopic(authToken: Token | null, params: {
        id: string;
    }): Observable<{
        res: api.Res;
        count: number;
    }>;
}
