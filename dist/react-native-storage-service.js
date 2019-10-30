import { aiInit, aiMethod, aiWithAsyncInit } from 'asynchronous-tools';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Constants;
(function (Constants) {
    Constants["StoragePrefix"] = "storage-service";
    Constants["CurrentUserKey"] = "storage-service-current-user:";
    Constants["CommonUser"] = "common";
})(Constants || (Constants = {}));

var Storage = /** @class */ (function () {
    function Storage(props) {
        var _this = this;
        this.login = function (userId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.setUser(userId)];
        }); }); };
        this.logout = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.setUser(Constants.CommonUser)];
        }); }); };
        this.retrieveCurrentUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.accessors.getItem(Constants.CurrentUserKey)];
                    case 1:
                        result = (_a._user = (_b.sent()) || Constants.CommonUser);
                        return [2 /*return*/, result];
                }
            });
        }); };
        this._show = 
        /**
         * @deprecated
         */
        function () { return __awaiter(_this, void 0, void 0, function () {
            var keys;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accessors.getAllKeys()];
                    case 1:
                        keys = _a.sent();
                        return [4 /*yield*/, Promise.all(keys.sort().map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            /* tslint:disable-next-line:no-console */
                                            _b = (_a = console).log;
                                            _c = ['   --- storage ---   ',
                                                key];
                                            return [4 /*yield*/, this.accessors.getItem(key)];
                                        case 1: 
                                        /* tslint:disable-next-line:no-console */
                                        return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // =============== Storage manipulations ================
        this._key = function (key, user) { return __awaiter(_this, void 0, void 0, function () {
            var prefix, _a, _b, resultKeys;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.getUserPrefix;
                        if (!(user === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getUser()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = user;
                        _c.label = 3;
                    case 3:
                        prefix = _a.apply(this, [_b]);
                        resultKeys = [].concat(key).map(function (key) { return "" + prefix + key; });
                        return [2 /*return*/, key instanceof Array ? resultKeys : resultKeys[0]];
                }
            });
        }); };
        this.getUserPrefix = function (userId) { return Constants.StoragePrefix + "-user-" + userId + ":"; };
        this._setItem = function (key, value, common) {
            if (common === void 0) { common = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = this.accessors).setItem;
                            return [4 /*yield*/, this._key(key, common ? Constants.CommonUser : undefined)];
                        case 1: return [2 /*return*/, (_b.apply(_a, [(_c.sent()),
                                value]))];
                    }
                });
            });
        };
        this._getItem = function (key, common) {
            if (common === void 0) { common = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = this.accessors).getItem;
                            return [4 /*yield*/, this._key(key, common ? Constants.CommonUser : undefined)];
                        case 1: return [2 /*return*/, (_b.apply(_a, [(_c.sent())]))];
                    }
                });
            });
        };
        this._removeItem = function (key, common) {
            if (common === void 0) { common = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = this.accessors).removeItem;
                            return [4 /*yield*/, this._key(key, common ? Constants.CommonUser : undefined)];
                        case 1: return [2 /*return*/, (_b.apply(_a, [(_c.sent())]))
                            // ========= AsyncStorage API for current user: =========
                        ];
                    }
                });
            });
        };
        // ========= AsyncStorage API for current user: =========
        this.setItem = function (key, value) { return _this._setItem(key, value); };
        this.getItem = function (key) { return _this._getItem(key); };
        this.removeItem = function (key) { return _this._removeItem(key); };
        this.getAllKeys = function () { return __awaiter(_this, void 0, void 0, function () {
            var prefix, _a, getPublicKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getUserPrefix;
                        return [4 /*yield*/, this.getUser()];
                    case 1:
                        prefix = _a.apply(this, [_b.sent()]);
                        getPublicKey = function (key) {
                            return key.substr(0, prefix.length) === prefix
                                ? key.substr(prefix.length)
                                : undefined;
                        };
                        return [2 /*return*/, this.accessors.getAllKeys().then(function (keys) {
                                return keys.reduce(function (acc, key) {
                                    var publicKey = getPublicKey(key);
                                    return acc.concat(publicKey || []);
                                }, []);
                            })];
                }
            });
        }); };
        this.multiGet = function (keys) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = this.accessors).multiGet;
                    return [4 /*yield*/, this._key(keys)];
                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent())])];
            }
        }); }); };
        this.multiRemove = function (keys) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = this.accessors).multiRemove;
                    return [4 /*yield*/, this._key(keys)];
                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent())])];
            }
        }); }); };
        var storageAccessors = props.storageAccessors;
        this.accessors = storageAccessors;
        if (!this.accessors.multiSet) {
            this.accessors.multiSet = function (keyValuePairs) { return Promise.all(keyValuePairs.map(function (_a) {
                var key = _a[0], value = _a[1];
                return _this.accessors.setItem(key, value);
            })); };
        }
        if (!this.accessors.multiGet) {
            this.accessors.multiGet = function (keys) { return Promise.all(keys.map(function (key) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [key];
                        return [4 /*yield*/, this.accessors.getItem(key)];
                    case 1: return [2 /*return*/, _a.concat([_b.sent()])];
                }
            }); }); })); };
        }
        if (!this.accessors.multiRemove) {
            this.accessors.multiRemove = function (keys) { return Promise.all(keys.map(function (key) { return _this.accessors.removeItem(key); })); };
        }
        this.init();
    }
    // Плохая идея, т.к. login можем вообще не вызывать и подефолту должны проинициализироваться с общим пользователем и под ним и работать
    // @aiInit
    // public async newInit() {
    //   return await this.retrieveCurrentUser() === undefined
    //     ? new Promise(resolve => this.initResolve = resolve)
    //     : undefined
    // }
    Storage.prototype.init = function () {
        return this.retrieveCurrentUser();
    };
    Storage.prototype.setUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._user = id;
                        return [4 /*yield*/, this.accessors.setItem(Constants.CurrentUserKey, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Storage.prototype.getUser = function () {
        return this._user === undefined ? this.retrieveCurrentUser() : this._user;
    };
    __decorate([
        aiInit,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Storage.prototype, "init", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Storage.prototype, "setUser", null);
    __decorate([
        aiMethod,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Storage.prototype, "getUser", null);
    Storage = __decorate([
        aiWithAsyncInit,
        __metadata("design:paramtypes", [Object])
    ], Storage);
    return Storage;
}());

var _this = undefined;
// Метод вынесен из класса Storage, чтобы в клиентском коде не было к нему доступа. Добавлять поля можно только на этапе создания!
var addProperty = function (name, isPrivate, target) {
    if (isPrivate === void 0) { isPrivate = true; }
    var _target = target;
    Object.defineProperty(target, name, {
        value: {
            set: function (value) { return _target._setItem(name, JSON.stringify(value), !isPrivate); },
            get: function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, _target._getItem(name, !isPrivate)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            }); }); },
            remove: function () { return _target._removeItem(name, !isPrivate); }
        }
    });
};
var createStorage = function (props) {
    var storage = new Storage(props);
    var add = function (target, isPrivate) {
        if (isPrivate === void 0) { isPrivate = true; }
        return (function (propertyName, propertyTypedStubValue) {
            addProperty(propertyName, isPrivate, target);
            return {
                build: function () { return target; },
                addPrivate: addPrivate(target),
                addPublic: addPublic(target)
            };
        });
    };
    var addPrivate = function (target) { return add(target); };
    var addPublic = function (target) { return add(target, false); };
    return {
        addPrivate: addPrivate(storage),
        addPublic: addPublic(storage)
    };
};
// Это нужно для передачи типа добовляемого свойства, т.к. на данный момент typescript не поддерживает частичный вывод аргументов типа
// https://github.com/Microsoft/TypeScript/pull/26349
// https://github.com/microsoft/TypeScript/issues/26242
var _ = null;
var typed = function () { return _; };

export default createStorage;
export { _, createStorage, typed };
//# sourceMappingURL=react-native-storage-service.js.map
