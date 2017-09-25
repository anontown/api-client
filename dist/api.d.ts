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
export declare class API {
    private config;
    constructor(config?: APIConfig);
    private toAuthToken(token);
    private stream<T>(name, params, token, authUser, recaptcha);
    private request<T>(path, params, token, authUser, recaptcha);
    createRes(authToken: api.Token, params: {
        topic: string;
        name: string | null;
        text: string;
        reply: string | null;
        profile: string | null;
        age: boolean;
    }): Observable<api.Res>;
    findResOne(authToken: api.Token | null, params: {
        id: string;
    }): Observable<api.Res>;
    findResIn(authToken: api.Token | null, params: {
        ids: string[];
    }): Observable<api.Res[]>;
    findRes(authToken: api.Token | null, params: {
        topic: string;
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResNew(authToken: api.Token | null, params: {
        topic: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResHash(authToken: api.Token | null, params: {
        topic: string;
        hash: string;
    }): Observable<api.Res[]>;
    findResReply(authToken: api.Token | null, params: {
        topic: string;
        reply: string;
    }): Observable<api.Res[]>;
    findResNotice(authToken: api.Token, params: {
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Res[]>;
    findResNoticeNew(authToken: api.Token, params: {
        limit: number;
    }): Observable<api.Res[]>;
    uvRes(authToken: api.Token, params: {
        id: string;
    }): Observable<api.Res>;
    dvRes(authToken: api.Token, params: {
        id: string;
    }): Observable<api.Res>;
    cvRes(authToken: api.Token, params: {
        id: string;
    }): Observable<api.Res>;
    delRes(authToken: api.Token, params: {
        id: string;
    }): Observable<api.Res>;
    createTopicNormal(authToken: api.Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Observable<api.TopicNormal>;
    createTopicOne(authToken: api.Token, params: {
        title: string;
        tags: string[];
        text: string;
    }): Observable<api.TopicOne>;
    createTopicFork(authToken: api.Token, params: {
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
    updateTopic(authToken: api.Token, params: {
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
    findMsgOne(authToken: api.Token, params: {
        id: string;
    }): Observable<api.Msg>;
    findMsgIn(authToken: api.Token, params: {
        ids: string[];
    }): Observable<api.Msg[]>;
    findMsg(authToken: api.Token, params: {
        type: 'before' | 'after';
        equal: boolean;
        date: string;
        limit: number;
    }): Observable<api.Msg[]>;
    findMsgNew(authToken: api.Token, params: {
        limit: number;
    }): Observable<api.Msg[]>;
    createProfile(authToken: api.Token, params: {
        name: string;
        text: string;
        sn: string;
    }): Observable<api.Profile>;
    findProfileOne(authToken: api.Token | null, params: {
        id: string;
    }): Observable<api.Profile>;
    findProfileIn(authToken: api.Token | null, params: {
        ids: string[];
    }): Observable<api.Profile[]>;
    findProfileAll(authToken: api.Token): Observable<api.Profile[]>;
    updateProfile(authToken: api.Token, params: {
        id: string;
        name: string;
        text: string;
        sn: string;
    }): Observable<api.Profile>;
    findTokenOne(authToken: api.Token): Observable<api.TokenMaster>;
    findTokenAll(authToken: api.TokenMaster): Observable<api.Token[]>;
    deleteTokenClient(authToken: api.TokenMaster, params: {
        client: string;
    }): Observable<void>;
    findTokenClientAll(authToken: api.Token): Observable<api.Client[]>;
    createTokenMaster(authUser: AuthUser): Observable<api.TokenMaster>;
    createTokenGeneral(authToken: api.TokenMaster, params: {
        client: string;
    }): Observable<api.TokenGeneral>;
    setTokenStorage(authToken: api.Token, params: {
        name: string;
        value: string;
    }): Observable<void>;
    getTokenStorage(authToken: api.Token, params: {
        name: string;
    }): Observable<string>;
    delTokenStorage(authToken: api.Token, params: {
        name: string;
    }): Observable<void>;
    listTokenStorage(authToken: api.Token): Observable<string[]>;
    createTokenReq(authToken: api.Token): Observable<api.TokenReq>;
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
    createClient(authToken: api.TokenMaster, params: {
        name: string;
        url: string;
    }): Observable<api.Client>;
    updateClient(authToken: api.TokenMaster, params: {
        id: string;
        name: string;
        url: string;
    }): Observable<api.Client>;
    findClientOne(authToken: api.TokenMaster | null, params: {
        id: string;
    }): Observable<api.Client>;
    findClientIn(authToken: api.TokenMaster | null, params: {
        ids: string[];
    }): Observable<api.Client[]>;
    findClientAll(authToken: api.TokenMaster): Observable<api.Client[]>;
    authUser(authUser: AuthUser): Observable<void>;
    streamUpdateTopic(authToken: api.Token | null, params: {
        id: string;
    }): Observable<{
        res: api.Res;
        count: number;
    }>;
}
