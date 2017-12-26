import * as api from '@anontown/api-types';
import { Observable, Observer } from 'rxjs';
export class AtError {
  constructor(public statusCode: number,
    public type: string,
    public errors: {
      message: string;
      data: any;
    }[]) {
  }
}

export interface APIConfig {
  httpOrigin: string;
  socketOrigin: string;
}

export const defaltConfig: APIConfig = {
  httpOrigin: 'https://api.anontown.com',
  socketOrigin: 'wss://api.anontown.com'
};

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

export type Token = TokenMaster | TokenGeneral;

export class API {
  constructor(private config: APIConfig = defaltConfig) { }

  private toAuthToken(token: Token | null): AuthToken | null {
    return token !== null ? { id: token.id, key: token.key } : null;
  }

  private stream<T>(name: string, params: any, token: Token | null, authUser: AuthUser | null, recaptcha: string | null): Observable<T> {
    let authToken = this.toAuthToken(token);

    let query = `name=${encodeURIComponent(name)}&params=${encodeURIComponent(JSON.stringify({
      authUser,
      authToken,
      recaptcha,
      params
    }))}`;

    return Observable.webSocket<T>(this.config.socketOrigin + '?' + query);
  }

  private request<T>(path: string, params: any, token: Token | null, authUser: AuthUser | null, recaptcha: string | null): Observable<T> {
    let authToken = this.toAuthToken(token);
    let url = this.config.httpOrigin + path;
    return Observable.ajax({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ authUser, authToken, recaptcha, params }),
      crossDomain: true
    })
      .map(res => {
        const json = res.response;
        if (res.status === 200) {
          return json;
        } else {
          return Observable.throw(new AtError(res.status, json.type, json.errors));
        }
      });
  }

  //[res]
  createRes(authToken: Token,
    params: {
      topic: string,
      name: string | null,
      body: string,
      reply: string | null,
      profile: string | null,
      age: boolean
    }) {
    return this.request<api.Res>(
      '/res/create',
      params,
      authToken,
      null,
      null);
  }
  findResOne(authToken: Token | null,
    params: {
      id: string
    }) {
    return this.request<api.Res>(
      '/res/find/one',
      params,
      authToken,
      null,
      null);
  }
  findResIn(authToken: Token | null,
    params: {
      ids: string[]
    }) {
    return this.request<api.Res[]>(
      '/res/find/in',
      params,
      authToken,
      null,
      null);
  }
  findRes(authToken: Token | null,
    params: {
      topic: string,
      type: 'before' | 'after',
      equal: boolean,
      date: string,
      limit: number
    }) {
    return this.request<api.Res[]>(
      '/res/find',
      params,
      authToken,
      null,
      null);
  }
  findResNew(authToken: Token | null,
    params: {
      topic: string,
      limit: number
    }) {
    return this.request<api.Res[]>(
      '/res/find/new',
      params,
      authToken,
      null,
      null);
  }
  findResHash(authToken: Token | null,
    params: {
      topic: string,
      hash: string
    }) {
    return this.request<api.Res[]>(
      '/res/find/hash',
      params,
      authToken,
      null,
      null);
  }
  findResReply(authToken: Token | null,
    params: {
      topic: string,
      reply: string
    }) {
    return this.request<api.Res[]>(
      '/res/find/reply',
      params,
      authToken,
      null,
      null);
  }
  findResNotice(authToken: Token,
    params: {
      type: 'before' | 'after',
      equal: boolean,
      date: string,
      limit: number
    }) {
    return this.request<api.Res[]>(
      '/res/find/notice',
      params,
      authToken,
      null,
      null);
  }
  findResNoticeNew(authToken: Token,
    params: {
      limit: number
    }) {
    return this.request<api.Res[]>(
      '/res/find/notice/new',
      params,
      authToken,
      null,
      null);
  }
  uvRes(authToken: Token,
    params: {
      id: string
    }) {
    return this.request<api.Res>(
      '/res/uv',
      params,
      authToken,
      null,
      null);
  }
  dvRes(authToken: Token,
    params: {
      id: string
    }) {
    return this.request<api.Res>(
      '/res/dv',
      params,
      authToken,
      null,
      null);
  }
  cvRes(authToken: Token,
    params: {
      id: string
    }) {
    return this.request<api.Res>(
      '/res/cv',
      params,
      authToken,
      null,
      null);
  }
  delRes(authToken: Token,
    params: {
      id: string
    }) {
    return this.request<api.Res>(
      '/res/del',
      params,
      authToken,
      null,
      null);
  }

  //[topic]
  createTopicNormal(authToken: Token,
    params: {
      title: string,
      tags: string[],
      body: string
    }) {
    return this.request<api.TopicNormal>(
      '/topic/create/normal',
      params,
      authToken,
      null,
      null);
  }

  createTopicOne(authToken: Token,
    params: {
      title: string,
      tags: string[],
      body: string
    }) {
    return this.request<api.TopicOne>(
      '/topic/create/one',
      params,
      authToken,
      null,
      null);
  }

  createTopicFork(authToken: Token,
    params: {
      title: string,
      parent: string
    }) {
    return this.request<api.TopicFork>(
      '/topic/create/fork',
      params,
      authToken,
      null,
      null);
  }

  findTopicOne(
    params: {
      id: string
    }) {
    return this.request<api.Topic>(
      '/topic/find/one',
      params,
      null,
      null,
      null);
  }
  findTopicIn(
    params: {
      ids: string[]
    }) {
    return this.request<api.Topic[]>(
      '/topic/find/in',
      params,
      null,
      null,
      null);
  }
  findTopicTags(params: { limit: number }) {
    return (this.request<{ name: string, count: number }[]>(
      '/topic/find/tags',
      params,
      null,
      null,
      null));
  }
  findTopic(
    params: {
      title: string[],
      tags: string[],
      skip: number,
      limit: number,
      activeOnly: boolean
    }) {
    return this.request<api.Topic[]>(
      '/topic/find',
      params,
      null,
      null,
      null);
  }

  findTopicFork(
    params: {
      parent: string,
      skip: number,
      limit: number,
      activeOnly: boolean
    }) {
    return this.request<api.TopicFork[]>(
      '/topic/find/fork',
      params,
      null,
      null,
      null);
  }

  updateTopic(authToken: Token,
    params: {
      id: string,
      title: string,
      tags: string[],
      body: string
    }) {
    return this.request<api.TopicNormal>(
      '/topic/update',
      params,
      authToken,
      null,
      null);
  }

  //[history]
  findHistoryOne(params: {
    id: string
  }) {
    return this.request<api.History>(
      '/history/find/one',
      params,
      null,
      null,
      null);
  }

  findHistoryIn(params: {
    ids: string[]
  }) {
    return this.request<api.History[]>(
      '/history/find/in',
      params,
      null,
      null,
      null);
  }

  findHistoryAll(params: {
    topic: string
  }) {
    return this.request<api.History[]>(
      '/history/find/all',
      params,
      null,
      null,
      null);
  }
  //[msg]
  findMsgOne(authToken: Token,
    params: {
      id: string
    }) {
    return this.request<api.Msg>(
      '/msg/find/one',
      params,
      authToken,
      null,
      null);
  }
  findMsgIn(authToken: Token,
    params: {
      ids: string[]
    }) {
    return this.request<api.Msg[]>(
      '/msg/find/in',
      params,
      authToken,
      null,
      null);
  }
  findMsg(authToken: Token,
    params: {
      type: 'before' | 'after',
      equal: boolean,
      date: string,
      limit: number
    }) {
    return this.request<api.Msg[]>(
      '/msg/find',
      params,
      authToken,
      null,
      null);
  }
  findMsgNew(authToken: Token,
    params: {
      limit: number
    }) {
    return this.request<api.Msg[]>(
      '/msg/find/new',
      params,
      authToken,
      null,
      null);
  }
  //[profile]
  createProfile(authToken: Token,
    params: {
      name: string,
      body: string,
      sn: string
    }) {
    return this.request<api.Profile>(
      '/profile/create',
      params,
      authToken,
      null,
      null);
  }
  findProfileOne(authToken: Token | null,
    params: {
      id: string
    }) {
    return this.request<api.Profile>(
      '/profile/find/one',
      params,
      authToken,
      null,
      null);
  }
  findProfileIn(authToken: Token | null,
    params: {
      ids: string[]
    }) {
    return this.request<api.Profile[]>(
      '/profile/find/in',
      params,
      authToken,
      null,
      null);
  }
  findProfileAll(authToken: Token) {
    return this.request<api.Profile[]>(
      '/profile/find/all',
      null,
      authToken,
      null,
      null);
  }
  updateProfile(authToken: Token,
    params: {
      id: string,
      name: string,
      body: string,
      sn: string
    }) {
    return this.request<api.Profile>(
      '/profile/update',
      params,
      authToken,
      null,
      null);
  }
  //[token]
  findTokenOne(authToken: TokenMaster): Observable<api.TokenMaster>;
  findTokenOne(authToken: TokenGeneral): Observable<api.TokenGeneral>;
  findTokenOne(authToken: Token): Observable<api.Token>;
  findTokenOne(authToken: Token) {
    return this.request<api.Token>(
      '/token/find/one',
      null,
      authToken,
      null,
      null);
  }
  findTokenAll(authToken: TokenMaster) {
    return this.request<api.Token[]>(
      '/token/find/all',
      null,
      authToken,
      null,
      null);
  }
  deleteTokenClient(authToken: TokenMaster, params: { client: string }) {
    return this.request<void>(
      '/token/client/delete',
      params,
      authToken,
      null,
      null);
  }
  findTokenClientAll(authToken: Token) {
    return this.request<api.Client[]>(
      '/token/find/client/all',
      null,
      authToken,
      null,
      null);
  }
  createTokenMaster(authUser: AuthUser) {
    return this.request<api.TokenMaster>(
      '/token/create/master',
      null,
      null,
      authUser,
      null);
  }
  createTokenGeneral(authToken: TokenMaster,
    params: {
      client: string
    }) {
    return this.request<api.TokenGeneral>(
      '/token/create/general',
      params,
      authToken,
      null,
      null);
  }
  setTokenStorage(authToken: Token,
    params: {
      name: string,
      value: string
    }) {
    return this.request<void>(
      '/token/storage/set',
      params,
      authToken,
      null,
      null);
  }
  getTokenStorage(authToken: Token,
    params: {
      name: string
    }) {
    return this.request<string>(
      '/token/storage/get',
      params,
      authToken,
      null,
      null);
  }
  delTokenStorage(authToken: Token,
    params: {
      name: string
    }) {
    return this.request<void>(
      '/token/storage/delete',
      params,
      authToken,
      null,
      null);
  }

  listTokenStorage(authToken: Token) {
    return this.request<string[]>(
      '/token/storage/list',
      null,
      authToken,
      null,
      null);
  }
  createTokenReq(authToken: Token) {
    return this.request<api.TokenReq>(
      '/token/req/create',
      null,
      authToken,
      null,
      null);
  }
  findTokenReq(
    params: {
      id: string,
      key: string
    }) {
    return this.request<api.TokenGeneral>(
      '/token/find/req',
      params,
      null,
      null,
      null);
  }
  //[user]
  findUserID(
    params: {
      sn: string
    }) {
    return this.request<string>(
      '/user/find/id',
      params,
      null,
      null,
      null);
  }
  findUserSN(
    params: {
      id: string
    }) {
    return this.request<string>(
      '/user/find/sn',
      params,
      null,
      null,
      null);
  }
  createUser(recaptcha: string,
    params: {
      sn: string,
      pass: string
    }) {
    return this.request<api.User>(
      '/user/create',
      params,
      null,
      null,
      recaptcha);
  }
  updateUser(authUser: AuthUser,
    params: {
      pass: string,
      sn: string
    }) {
    return this.request<api.User>(
      '/user/update',
      params,
      null,
      authUser,
      null);
  }
  //[client]
  createClient(authToken: TokenMaster,
    params: {
      name: string,
      url: string
    }) {
    return this.request<api.Client>(
      '/client/create',
      params,
      authToken,
      null,
      null);
  }
  updateClient(authToken: TokenMaster,
    params: {
      id: string,
      name: string,
      url: string
    }) {
    return this.request<api.Client>(
      '/client/update',
      params,
      authToken,
      null,
      null);
  }
  findClientOne(authToken: TokenMaster | null,
    params: {
      id: string
    }) {
    return this.request<api.Client>(
      '/client/find/one',
      params,
      authToken,
      null,
      null);
  }
  findClientIn(authToken: TokenMaster | null,
    params: {
      ids: string[]
    }) {
    return this.request<api.Client[]>(
      '/client/find/in',
      params,
      authToken,
      null,
      null);
  }
  findClientAll(authToken: TokenMaster) {
    return this.request<api.Client[]>(
      '/client/find/all',
      null,
      authToken,
      null,
      null);
  }

  authUser(authUser: AuthUser) {
    return this.request<void>(
      '/user/auth',
      null,
      null,
      authUser,
      null);
  }

  streamUpdateTopic(authToken: Token | null,
    params: {
      id: string
    }) {
    return this.stream<{ res: api.Res, count: number }>('topic-update', params, authToken, null, null);
  }
}