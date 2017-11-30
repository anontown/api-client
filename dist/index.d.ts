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
    private toAuthToken(token);
    private stream<T>(name, params, token, authUser, recaptcha);
    private request<T>(path, params, token, authUser, recaptcha);
    createRes(authToken: Token, params: {
        topic: string;
        name: string | null;
        text: string;
        reply: string | null;
        profile: string | null;
        age: boolean;
    }): Observable<api.Res>;
    findResOne(authToken: Token | null, params: {
        id: string;
    }): Observable<api.Res>;
    findResIn(authToken: Token | null, params: {
        ids: string[];
    }): Observable<api.Res[]>;
    findRes(authToken: Token | null, params: {
        topic: string;
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResNew(authToken: Token | null, params: {
        topic: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResHash(authToken: Token | null, params: {
        topic: string;
        hash: string;
    }): Observable<api.Res[]>;
    findResReply(authToken: Token | null, params: {
        topic: string;
        reply: string;
    }): Observable<api.Res[]>;
    findResNotice(authToken: Token, params: {
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResNoticeNew(authToken: Token, params: {
        limit: number;
    }): Observable<api.Res[]>;
    uvRes(authToken: Token, params: {
        id: string;
    }): Observable<api.Res>;
    dvRes(authToken: Token, params: {
        id: string;
    }): Observable<api.Res>;
    cvRes(authToken: Token, params: {
        id: string;
    }): Observable<api.Res>;
    delRes(authToken: Token, params: {
        id: string;
    }): Observable<api.Res>;
    createTopicNormal(authToken: Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Observable<api.TopicNormal>;
    createTopicOne(authToken: Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Observable<api.TopicOne>;
    createTopicFork(authToken: Token, params: {
        title: string;
        parent: string;
    }): Observable<api.TopicFork>;
    findTopicOne(params: {
        id: string;
    }): Observable<api.Topic>;
    findTopicIn(params: {
        ids: string[];
    }): Observable<api.Topic[]>;
    findTopicTags(params: {
        limit: number;
    }): Observable<{
        name: string;
        count: number;
    }[]>;
    findTopic(params: {
        title: string;
        tags: string[];
        skip: number;
        limit: number;
        activeOnly: boolean;
    }): Observable<api.Topic[]>;
    findTopicFork(params: {
        parent: string;
        skip: number;
        limit: number;
        activeOnly: boolean;
    }): Observable<api.TopicFork[]>;
    updateTopic(authToken: Token, params: {
        id: string;
        title: string;
        tags: string[];
        text: string;
    }): Observable<api.TopicNormal>;
    findHistoryOne(params: {
        id: string;
    }): Observable<api.History>;
    findHistoryIn(params: {
        ids: string[];
    }): Observable<api.History[]>;
    findHistoryAll(params: {
        topic: string;
    }): Observable<api.History[]>;
    findMsgOne(authToken: Token, params: {
        id: string;
    }): Observable<api.Msg>;
    findMsgIn(authToken: Token, params: {
        ids: string[];
    }): Observable<api.Msg[]>;
    findMsg(authToken: Token, params: {
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Msg[]>;
    findMsgNew(authToken: Token, params: {
        limit: number;
    }): Observable<api.Msg[]>;
    createProfile(authToken: Token, params: {
        name: string;
        text: string;
        sn: string;
    }): Observable<api.Profile>;
    findProfileOne(authToken: Token | null, params: {
        id: string;
    }): Observable<api.Profile>;
    findProfileIn(authToken: Token | null, params: {
        ids: string[];
    }): Observable<api.Profile[]>;
    findProfileAll(authToken: Token): Observable<api.Profile[]>;
    updateProfile(authToken: Token, params: {
        id: string;
        name: string;
        text: string;
        sn: string;
    }): Observable<api.Profile>;
    findTokenOne(authToken: TokenMaster): Observable<api.TokenMaster>;
    findTokenOne(authToken: TokenGeneral): Observable<api.TokenGeneral>;
    findTokenOne(authToken: Token): Observable<api.Token>;
    findTokenAll(authToken: TokenMaster): Observable<api.Token[]>;
    deleteTokenClient(authToken: TokenMaster, params: {
        client: string;
    }): Observable<void>;
    findTokenClientAll(authToken: Token): Observable<api.Client[]>;
    createTokenMaster(authUser: AuthUser): Observable<api.TokenMaster>;
    createTokenGeneral(authToken: TokenMaster, params: {
        client: string;
    }): Observable<api.TokenGeneral>;
    setTokenStorage(authToken: Token, params: {
        name: string;
        value: string;
    }): Observable<void>;
    getTokenStorage(authToken: Token, params: {
        name: string;
    }): Observable<string>;
    delTokenStorage(authToken: Token, params: {
        name: string;
    }): Observable<void>;
    listTokenStorage(authToken: Token): Observable<string[]>;
    createTokenReq(authToken: Token): Observable<api.TokenReq>;
    findTokenReq(params: {
        id: string;
        key: string;
    }): Observable<api.TokenGeneral>;
    findUserID(params: {
        sn: string;
    }): Observable<string>;
    findUserSN(params: {
        id: string;
    }): Observable<string>;
    createUser(recaptcha: string, params: {
        sn: string;
        pass: string;
    }): Observable<api.User>;
    updateUser(authUser: AuthUser, params: {
        pass: string;
        sn: string;
    }): Observable<api.User>;
    createClient(authToken: TokenMaster, params: {
        name: string;
        url: string;
    }): Observable<api.Client>;
    updateClient(authToken: TokenMaster, params: {
        id: string;
        name: string;
        url: string;
    }): Observable<api.Client>;
    findClientOne(authToken: TokenMaster | null, params: {
        id: string;
    }): Observable<api.Client>;
    findClientIn(authToken: TokenMaster | null, params: {
        ids: string[];
    }): Observable<api.Client[]>;
    findClientAll(authToken: TokenMaster): Observable<api.Client[]>;
    authUser(authUser: AuthUser): Observable<void>;
    streamUpdateTopic(authToken: Token | null, params: {
        id: string;
    }): Observable<{
        res: api.Res;
        count: number;
    }>;
}
