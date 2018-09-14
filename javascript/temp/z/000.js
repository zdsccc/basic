var requirejs, require, define; (function (global) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document), isWebWorker = !isBrowser && typeof importScripts !== "undefined", readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]", contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = false;
    function isFunction(it) { return ostring.call(it) === "[object Function]" } function isArray(it) { return ostring.call(it) === "[object Array]" } function each(ary, func) { if (ary) { var i; for (i = 0; i < ary.length; i += 1) { if (ary[i] && func(ary[i], i, ary)) { break } } } } function eachReverse(ary, func) { if (ary) { var i; for (i = ary.length - 1; i > -1; i -= 1) { if (ary[i] && func(ary[i], i, ary)) { break } } } } function hasProp(obj, prop) { return hasOwn.call(obj, prop) } function getOwn(obj, prop) { return hasProp(obj, prop) && obj[prop] } function eachProp(obj, func) { var prop; for (prop in obj) { if (hasProp(obj, prop)) { if (func(obj[prop], prop)) { break } } } } function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === "object" && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                        if (!target[prop]) {
                        target[prop] = {}
                        } mixin(target[prop], value, force, deepStringMixin)
                    } else { target[prop] = value }
                }
            })
        } return target
    } function bind(obj, fn) { return function () { return fn.apply(obj, arguments) } } function scripts() { return document.getElementsByTagName("script") } function defaultOnError(err) { throw err } function getGlobal(value) { if (!value) { return value } var g = global; each(value.split("."), function (part) { g = g[part] }); return g } function makeError(id, msg, err, requireModules) { var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id); e.requireType = id; e.requireModules = requireModules; if (err) { e.originalError = err } return e } if (typeof define !== "undefined") { return } if (typeof requirejs !== "undefined") { if (isFunction(requirejs)) { return } cfg = requirejs; requirejs = undefined } if (typeof require !== "undefined" && !isFunction(require)) {
        cfg = require; require = undefined
    } function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} }, registry = {}, enabledRegistry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, bundlesMap = {}, requireCounter = 1, unnormalizedCounter = 1; function trimDots(ary) { var i, part, length = ary.length; for (i = 0; i < length; i++) { part = ary[i]; if (part === ".") { ary.splice(i, 1); i -= 1 } else { if (part === "..") { if (i === 1 && (ary[2] === ".." || ary[0] === "..")) { break } else { if (i > 0) { ary.splice(i - 1, 2); i -= 2 } } } } } } function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split("/"), normalizedBaseParts = baseParts, map = config.map, starMap = map && map["*"]; if (name && name.charAt(0) === ".") {
                if (baseName) {
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = name.split("/"); lastIndex = name.length - 1; if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) { name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "") } name = normalizedBaseParts.concat(name); trimDots(name); name = name.join("/")
                } else { if (name.indexOf("./") === 0) { name = name.substring(2) } }
            } if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split("/"); outerLoop: for (i = nameParts.length; i > 0; i -= 1) { nameSegment = nameParts.slice(0, i).join("/"); if (baseParts) { for (j = baseParts.length; j > 0; j -= 1) { mapValue = getOwn(map, baseParts.slice(0, j).join("/")); if (mapValue) { mapValue = getOwn(mapValue, nameSegment); if (mapValue) { foundMap = mapValue; foundI = i; break outerLoop } } } } if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) { foundStarMap = getOwn(starMap, nameSegment); starI = i } } if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI
                } if (foundMap) { nameParts.splice(0, foundI, foundMap); name = nameParts.join("/") }
            } pkgMain = getOwn(config.pkgs, name); return pkgMain ? pkgMain : name
        } function removeScript(name) { if (isBrowser) { each(scripts(), function (scriptNode) { if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) { scriptNode.parentNode.removeChild(scriptNode); return true } }) } } function hasPathFallback(id) { var pathConfig = getOwn(config.paths, id); if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) { pathConfig.shift(); context.require.undef(id); context.require([id]); return true } } function splitPrefix(name) { var prefix, index = name ? name.indexOf("!") : -1; if (index > -1) { prefix = name.substring(0, index); name = name.substring(index + 1, name.length) } return [prefix, name] } function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts, prefix = null, parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = true, normalizedName = "";
            if (!name) { isDefine = false; name = "_@r" + (requireCounter += 1) } nameParts = splitPrefix(name); prefix = nameParts[0]; name = nameParts[1]; if (prefix) { prefix = normalize(prefix, parentName, applyMap); pluginModule = getOwn(defined, prefix) } if (name) { if (prefix) { if (pluginModule && pluginModule.normalize) { normalizedName = pluginModule.normalize(name, function (name) { return normalize(name, parentName, applyMap) }) } else { normalizedName = normalize(name, parentName, applyMap) } } else { normalizedName = normalize(name, parentName, applyMap); nameParts = splitPrefix(normalizedName); prefix = nameParts[0]; normalizedName = nameParts[1]; isNormalized = true; url = context.nameToUrl(normalizedName) } } suffix = prefix && !pluginModule && !isNormalized ? "_unnormalized" + (unnormalizedCounter += 1) : ""; return { prefix: prefix, name: normalizedName, parentMap: parentModuleMap, unnormalized: !!suffix, url: url, originalName: originalName, isDefine: isDefine, id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix }
        } function getModule(depMap) { var id = depMap.id, mod = getOwn(registry, id); if (!mod) { mod = registry[id] = new context.Module(depMap) } return mod } function on(depMap, name, fn) { var id = depMap.id, mod = getOwn(registry, id); if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) { if (name === "defined") { fn(defined[id]) } } else { mod = getModule(depMap); if (mod.error && name === "error") { fn(mod.error) } else { mod.on(name, fn) } } } function onError(err, errback) { var ids = err.requireModules, notified = false; if (errback) { errback(err) } else { each(ids, function (id) { var mod = getOwn(registry, id); if (mod) { mod.error = err; if (mod.events.error) { notified = true; mod.emit("error", err) } } }); if (!notified) { req.onError(err) } } } function takeGlobalQueue() { if (globalDefQueue.length) { apsp.apply(defQueue, [defQueue.length, 0].concat(globalDefQueue)); globalDefQueue = [] } } handlers = {
            require: function (mod) {
                if (mod.require) {
                    return mod.require
                } else { return (mod.require = context.makeRequire(mod.map)) }
            }, exports: function (mod) { mod.usingExports = true; if (mod.map.isDefine) { if (mod.exports) { return (defined[mod.map.id] = mod.exports) } else { return (mod.exports = defined[mod.map.id] = {}) } } }, module: function (mod) { if (mod.module) { return mod.module } else { return (mod.module = { id: mod.map.id, uri: mod.map.url, config: function () { return getOwn(config.config, mod.map.id) || {} }, exports: mod.exports || (mod.exports = {}) }) } }
        }; function cleanRegistry(id) { delete registry[id]; delete enabledRegistry[id] } function breakCycle(mod, traced, processed) {
            var id = mod.map.id; if (mod.error) { mod.emit("error", mod.error) } else {
            traced[id] = true; each(mod.depMaps, function (depMap, i) {
                var depId = depMap.id, dep = getOwn(registry, depId); if (dep && !mod.depMatched[i] && !processed[depId]) {
                    if (getOwn(traced, depId)) {
                        mod.defineDep(i, defined[depId]);
                        mod.check()
                    } else { breakCycle(dep, traced, processed) }
                }
            }); processed[id] = true
            }
        } function checkLoaded() {
            var err, usingPathFallback, waitInterval = config.waitSeconds * 1000, expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(), noLoads = [], reqCalls = [], stillLoading = false, needCycleCheck = true; if (inCheckLoaded) { return } inCheckLoaded = true; eachProp(enabledRegistry, function (mod) { var map = mod.map, modId = map.id; if (!mod.enabled) { return } if (!map.isDefine) { reqCalls.push(mod) } if (!mod.error) { if (!mod.inited && expired) { if (hasPathFallback(modId)) { usingPathFallback = true; stillLoading = true } else { noLoads.push(modId); removeScript(modId) } } else { if (!mod.inited && mod.fetched && map.isDefine) { stillLoading = true; if (!map.prefix) { return (needCycleCheck = false) } } } } }); if (expired && noLoads.length) {
                err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads);
                err.contextName = context.contextName; return onError(err)
            } if (needCycleCheck) { each(reqCalls, function (mod) { breakCycle(mod, {}, {}) }) } if ((!expired || usingPathFallback) && stillLoading) { if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) { checkLoadedTimeoutId = setTimeout(function () { checkLoadedTimeoutId = 0; checkLoaded() }, 50) } } inCheckLoaded = false
        } Module = function (map) { this.events = getOwn(undefEvents, map.id) || {}; this.map = map; this.shim = getOwn(config.shim, map.id); this.depExports = []; this.depMaps = []; this.depMatched = []; this.pluginMaps = {}; this.depCount = 0 }; Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {}; if (this.inited) { return } this.factory = factory; if (errback) { this.on("error", errback) } else { if (this.events.error) { errback = bind(this, function (err) { this.emit("error", err) }) } } this.depMaps = depMaps && depMaps.slice(0);
                this.errback = errback; this.inited = true; this.ignore = options.ignore; if (options.enabled || this.enabled) { this.enable() } else { this.check() }
            }, defineDep: function (i, depExports) { if (!this.depMatched[i]) { this.depMatched[i] = true; this.depCount -= 1; this.depExports[i] = depExports } }, fetch: function () { if (this.fetched) { return } this.fetched = true; context.startTime = (new Date()).getTime(); var map = this.map; if (this.shim) { context.makeRequire(this.map, { enableBuildCallback: true })(this.shim.deps || [], bind(this, function () { return map.prefix ? this.callPlugin() : this.load() })) } else { return map.prefix ? this.callPlugin() : this.load() } }, load: function () { var url = this.map.url; if (!urlFetched[url]) { urlFetched[url] = true; context.load(this.map.id, url) } }, check: function () {
                if (!this.enabled || this.enabling) { return } var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
                if (!this.inited) { this.fetch() } else {
                    if (this.error) { this.emit("error", this.error) } else {
                        if (!this.defining) {
                        this.defining = true; if (this.depCount < 1 && !this.defined) {
                            if (isFunction(factory)) { if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError) { try { exports = context.execCb(id, factory, depExports, exports) } catch (e) { err = e } } else { exports = context.execCb(id, factory, depExports, exports) } if (this.map.isDefine && exports === undefined) { cjsModule = this.module; if (cjsModule) { exports = cjsModule.exports } else { if (this.usingExports) { exports = this.exports } } } if (err) { err.requireMap = this.map; err.requireModules = this.map.isDefine ? [this.map.id] : null; err.requireType = this.map.isDefine ? "define" : "require"; return onError((this.error = err)) } } else { exports = factory } this.exports = exports; if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;
                                if (req.onResourceLoad) { req.onResourceLoad(context, this.map, this.depMaps) }
                            } cleanRegistry(id); this.defined = true
                        } this.defining = false; if (this.defined && !this.defineEmitted) { this.defineEmitted = true; this.emit("defined", this.exports); this.defineEmitComplete = true }
                        }
                    }
                }
            }, callPlugin: function () {
                var map = this.map, id = map.id, pluginMap = makeModuleMap(map.prefix); this.depMaps.push(pluginMap); on(pluginMap, "defined", bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id), name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null, localRequire = context.makeRequire(map.parentMap, { enableBuildCallback: true }); if (this.map.unnormalized) {
                        if (plugin.normalize) { name = plugin.normalize(name, function (name) { return normalize(name, parentName, true) }) || "" } normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                        on(normalizedMap, "defined", bind(this, function (value) { this.init([], function () { return value }, null, { enabled: true, ignore: true }) })); normalizedMod = getOwn(registry, normalizedMap.id); if (normalizedMod) { this.depMaps.push(normalizedMap); if (this.events.error) { normalizedMod.on("error", bind(this, function (err) { this.emit("error", err) })) } normalizedMod.enable() } return
                    } if (bundleId) { this.map.url = context.nameToUrl(bundleId); this.load(); return } load = bind(this, function (value) { this.init([], function () { return value }, null, { enabled: true }) }); load.error = bind(this, function (err) { this.inited = true; this.error = err; err.requireModules = [id]; eachProp(registry, function (mod) { if (mod.map.id.indexOf(id + "_unnormalized") === 0) { cleanRegistry(mod.map.id) } }); onError(err) }); load.fromText = bind(this, function (text, textAlt) {
                        var moduleName = map.name, moduleMap = makeModuleMap(moduleName), hasInteractive = useInteractive;
                        if (textAlt) { text = textAlt } if (hasInteractive) { useInteractive = false } getModule(moduleMap); if (hasProp(config.config, id)) { config.config[moduleName] = config.config[id] } try { req.exec(text) } catch (e) { return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [id])) } if (hasInteractive) { useInteractive = true } this.depMaps.push(moduleMap); context.completeLoad(moduleName); localRequire([moduleName], load)
                    }); plugin.load(map.name, localRequire, load, config)
                })); context.enable(pluginMap, this); this.pluginMaps[pluginMap.id] = pluginMap
            }, enable: function () {
            enabledRegistry[this.map.id] = this; this.enabled = true; this.enabling = true; each(this.depMaps, bind(this, function (depMap, i) {
                var id, mod, handler; if (typeof depMap === "string") {
                    depMap = makeModuleMap(depMap, (this.map.isDefine ? this.map : this.map.parentMap), false, !this.skipMap);
                    this.depMaps[i] = depMap; handler = getOwn(handlers, depMap.id); if (handler) { this.depExports[i] = handler(this); return } this.depCount += 1; on(depMap, "defined", bind(this, function (depExports) { this.defineDep(i, depExports); this.check() })); if (this.errback) { on(depMap, "error", bind(this, this.errback)) }
                } id = depMap.id; mod = registry[id]; if (!hasProp(handlers, id) && mod && !mod.enabled) { context.enable(depMap, this) }
            })); eachProp(this.pluginMaps, bind(this, function (pluginMap) { var mod = getOwn(registry, pluginMap.id); if (mod && !mod.enabled) { context.enable(pluginMap, this) } })); this.enabling = false; this.check()
            }, on: function (name, cb) { var cbs = this.events[name]; if (!cbs) { cbs = this.events[name] = [] } cbs.push(cb) }, emit: function (name, evt) { each(this.events[name], function (cb) { cb(evt) }); if (name === "error") { delete this.events[name] } }
        }; function callGetModule(args) {
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2])
            }
        } function removeListener(node, func, name, ieName) { if (node.detachEvent && !isOpera) { if (ieName) { node.detachEvent(ieName, func) } } else { node.removeEventListener(name, func, false) } } function getScriptData(evt) { var node = evt.currentTarget || evt.srcElement; removeListener(node, context.onScriptLoad, "load", "onreadystatechange"); removeListener(node, context.onScriptError, "error"); return { node: node, id: node && node.getAttribute("data-requiremodule") } } function intakeDefines() { var args; takeGlobalQueue(); while (defQueue.length) { args = defQueue.shift(); if (args[0] === null) { return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1])) } else { callGetModule(args) } } } context = {
            config: config, contextName: contextName, registry: registry, defined: defined, urlFetched: urlFetched, defQueue: defQueue, Module: Module, makeModuleMap: makeModuleMap, nextTick: req.nextTick, onError: onError, configure: function (cfg) {
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                    cfg.baseUrl += "/"
                    }
                } var shim = config.shim, objs = { paths: true, bundles: true, config: true, map: true }; eachProp(cfg, function (value, prop) { if (objs[prop]) { if (!config[prop]) { config[prop] = {} } mixin(config[prop], value, true, true) } else { config[prop] = value } }); if (cfg.bundles) { eachProp(cfg.bundles, function (value, prop) { each(value, function (v) { if (v !== prop) { bundlesMap[v] = prop } }) }) } if (cfg.shim) { eachProp(cfg.shim, function (value, id) { if (isArray(value)) { value = { deps: value } } if ((value.exports || value.init) && !value.exportsFn) { value.exportsFn = context.makeShimExports(value) } shim[id] = value }); config.shim = shim } if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name; pkgObj = typeof pkgObj === "string" ? { name: pkgObj } : pkgObj; name = pkgObj.name; location = pkgObj.location; if (location) { config.paths[name] = pkgObj.location } config.pkgs[name] = pkgObj.name + "/" + (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    })
                } eachProp(registry, function (mod, id) { if (!mod.inited && !mod.map.unnormalized) { mod.map = makeModuleMap(id) } }); if (cfg.deps || cfg.callback) { context.require(cfg.deps || [], cfg.callback) }
            }, makeShimExports: function (value) { function fn() { var ret; if (value.init) { ret = value.init.apply(global, arguments) } return ret || (value.exports && getGlobal(value.exports)) } return fn }, makeRequire: function (relMap, options) {
                options = options || {}; function localRequire(deps, callback, errback) {
                    var id, map, requireMod; if (options.enableBuildCallback && callback && isFunction(callback)) { callback.__requireJsBuild = true } if (typeof deps === "string") {
                        if (isFunction(callback)) { return onError(makeError("requireargs", "Invalid require call"), errback) } if (relMap && hasProp(handlers, deps)) { return handlers[deps](registry[relMap.id]) } if (req.get) {
                            return req.get(context, deps, relMap, localRequire)
                        } map = makeModuleMap(deps, relMap, false, true); id = map.id; if (!hasProp(defined, id)) { return onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])"))) } return defined[id]
                    } intakeDefines(); context.nextTick(function () { intakeDefines(); requireMod = getModule(makeModuleMap(null, relMap)); requireMod.skipMap = options.skipMap; requireMod.init(deps, callback, errback, { enabled: true }); checkLoaded() }); return localRequire
                } mixin(localRequire, {
                    isBrowser: isBrowser, toUrl: function (moduleNamePlusExt) {
                        var ext, index = moduleNamePlusExt.lastIndexOf("."), segment = moduleNamePlusExt.split("/")[0], isRelative = segment === "." || segment === ".."; if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length); moduleNamePlusExt = moduleNamePlusExt.substring(0, index)
                        } return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true)
                    }, defined: function (id) { return hasProp(defined, makeModuleMap(id, relMap, false, true).id) }, specified: function (id) { id = makeModuleMap(id, relMap, false, true).id; return hasProp(defined, id) || hasProp(registry, id) }
                }); if (!relMap) { localRequire.undef = function (id) { takeGlobalQueue(); var map = makeModuleMap(id, relMap, true), mod = getOwn(registry, id); removeScript(id); delete defined[id]; delete urlFetched[map.url]; delete undefEvents[id]; eachReverse(defQueue, function (args, i) { if (args[0] === id) { defQueue.splice(i, 1) } }); if (mod) { if (mod.events.defined) { undefEvents[id] = mod.events } cleanRegistry(id) } } } return localRequire
            }, enable: function (depMap) { var mod = getOwn(registry, depMap.id); if (mod) { getModule(depMap).enable() } }, completeLoad: function (moduleName) {
                var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
                takeGlobalQueue(); while (defQueue.length) { args = defQueue.shift(); if (args[0] === null) { args[0] = moduleName; if (found) { break } found = true } else { if (args[0] === moduleName) { found = true } } callGetModule(args) } mod = getOwn(registry, moduleName); if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) { if (config.enforceDefine && (!shExports || !getGlobal(shExports))) { if (hasPathFallback(moduleName)) { return } else { return onError(makeError("nodefine", "No define call for " + moduleName, null, [moduleName])) } } else { callGetModule([moduleName, (shim.deps || []), shim.exportsFn]) } } checkLoaded()
            }, nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName); if (pkgMain) { moduleName = pkgMain } bundleId = getOwn(bundlesMap, moduleName); if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt)
                } if (req.jsExtRegExp.test(moduleName)) { url = moduleName + (ext || "") } else { paths = config.paths; syms = moduleName.split("/"); for (i = syms.length; i > 0; i -= 1) { parentModule = syms.slice(0, i).join("/"); parentPath = getOwn(paths, parentModule); if (parentPath) { if (isArray(parentPath)) { parentPath = parentPath[0] } syms.splice(0, i, parentPath); break } } url = syms.join("/"); url += (ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js")); url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url } return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url
            }, load: function (id, url) { req.load(context, id, url) }, execCb: function (name, callback, args, exports) { return callback.apply(exports, args) }, onScriptLoad: function (evt) {
                if (evt.type === "load" || (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    interactiveScript = null;
                    var data = getScriptData(evt); context.completeLoad(data.id)
                }
            }, onScriptError: function (evt) { var data = getScriptData(evt); if (!hasPathFallback(data.id)) { return onError(makeError("scripterror", "Script error for: " + data.id, evt, [data.id])) } }
        }; context.require = context.makeRequire(); return context
    } req = requirejs = function (deps, callback, errback, optional) { var context, config, contextName = defContextName; if (!isArray(deps) && typeof deps !== "string") { config = deps; if (isArray(callback)) { deps = callback; callback = errback; errback = optional } else { deps = [] } } if (config && config.context) { contextName = config.context } context = getOwn(contexts, contextName); if (!context) { context = contexts[contextName] = req.s.newContext(contextName) } if (config) { context.configure(config) } return context.require(deps, callback, errback) }; req.config = function (config) {
        return req(config)
    }; req.nextTick = typeof setTimeout !== "undefined" ? function (fn) { setTimeout(fn, 4) } : function (fn) { fn() }; if (!require) { require = req } req.version = version; req.jsExtRegExp = /^\/|:|\?|\.js$/; req.isBrowser = isBrowser; s = req.s = { contexts: contexts, newContext: newContext }; req({}); each(["toUrl", "undef", "defined", "specified"], function (prop) { req[prop] = function () { var ctx = contexts[defContextName]; return ctx.require[prop].apply(ctx, arguments) } }); if (isBrowser) { head = s.head = document.getElementsByTagName("head")[0]; baseElement = document.getElementsByTagName("base")[0]; if (baseElement) { head = s.head = baseElement.parentNode } } req.onError = defaultOnError; req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"); node.type = config.scriptType || "text/javascript";
        node.charset = "utf-8"; node.async = true; return node
    }; req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {}, node; if (isBrowser) { node = req.createNode(config, moduleName, url); node.setAttribute("data-requirecontext", context.contextName); node.setAttribute("data-requiremodule", moduleName); if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) { useInteractive = true; node.attachEvent("onreadystatechange", context.onScriptLoad) } else { node.addEventListener("load", context.onScriptLoad, false); node.addEventListener("error", context.onScriptError, false) } node.src = url; currentlyAddingScript = node; if (baseElement) { head.insertBefore(node, baseElement) } else { head.appendChild(node) } currentlyAddingScript = null; return node } else {
            if (isWebWorker) {
                try {
                    importScripts(url);
                    context.completeLoad(moduleName)
                } catch (e) { context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [moduleName])) }
            }
        }
    }; function getInteractiveScript() { if (interactiveScript && interactiveScript.readyState === "interactive") { return interactiveScript } eachReverse(scripts(), function (script) { if (script.readyState === "interactive") { return (interactiveScript = script) } }); return interactiveScript } if (isBrowser && !cfg.skipDataMain) {
        eachReverse(scripts(), function (script) {
            if (!head) { head = script.parentNode } dataMain = script.getAttribute("data-main"); if (dataMain) {
                mainScript = dataMain; if (!cfg.baseUrl) { src = mainScript.split("/"); mainScript = src.pop(); subPath = src.length ? src.join("/") + "/" : "./"; cfg.baseUrl = subPath } mainScript = mainScript.replace(jsSuffixRegExp, ""); if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain
                } cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript]; return true
            }
        })
    } define = function (name, deps, callback) { var node, context; if (typeof name !== "string") { callback = deps; deps = name; name = null } if (!isArray(deps)) { callback = deps; deps = null } if (!deps && isFunction(callback)) { deps = []; if (callback.length) { callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (match, dep) { deps.push(dep) }); deps = (callback.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(deps) } } if (useInteractive) { node = currentlyAddingScript || getInteractiveScript(); if (node) { if (!name) { name = node.getAttribute("data-requiremodule") } context = contexts[node.getAttribute("data-requirecontext")] } } (context ? context.defQueue : globalDefQueue).push([name, deps, callback]) }; define.amd = { jQuery: true }; req.exec = function (text) {
        return eval(text)
    }; req(cfg)
}(this));
/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */
(function (c, d) { if (typeof module === "object" && typeof module.exports === "object") { module.exports = c.document ? d(c, true) : function (a) { if (!a.document) { throw new Error("jQuery requires a window with a document") } return d(a) } } else { d(c) } }(typeof window !== "undefined" ? window : this, function (eg, cB) {
    var dW = []; var dy = dW.slice; var di = dW.concat; var dA = dW.push; var d6 = dW.indexOf; var c8 = {}; var d8 = c8.toString; var dZ = c8.hasOwnProperty; var d9 = {}; var cO = "1.11.3", ca = function (b, a) { return new ca.fn.init(b, a) }, d1 = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, cn = /^-ms-/, el = /-([\da-z])/gi, cK = function (b, a) {
        return a.toUpperCase()
    }; ca.fn = ca.prototype = { jquery: cO, constructor: ca, selector: "", length: 0, toArray: function () { return dy.call(this) }, get: function (a) { return a != null ? (a < 0 ? this[a + this.length] : this[a]) : dy.call(this) }, pushStack: function (b) { var a = ca.merge(this.constructor(), b); a.prevObject = this; a.context = this.context; return a }, each: function (a, b) { return ca.each(this, a, b) }, map: function (a) { return this.pushStack(ca.map(this, function (b, c) { return a.call(b, c, b) })) }, slice: function () { return this.pushStack(dy.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (b) { var a = this.length, c = +b + (b < 0 ? a : 0); return this.pushStack(c >= 0 && c < a ? [this[c]] : []) }, end: function () { return this.prevObject || this.constructor(null) }, push: dA, sort: dW.sort, splice: dW.splice }; ca.extend = ca.fn.extend = function () {
        var l, f, h, g, a, c, j = arguments[0] || {}, k = 1, d = arguments.length, b = false;
        if (typeof j === "boolean") { b = j; j = arguments[k] || {}; k++ } if (typeof j !== "object" && !ca.isFunction(j)) { j = {} } if (k === d) { j = this; k-- } for (; k < d; k++) { if ((a = arguments[k]) != null) { for (g in a) { l = j[g]; h = a[g]; if (j === h) { continue } if (b && h && (ca.isPlainObject(h) || (f = ca.isArray(h)))) { if (f) { f = false; c = l && ca.isArray(l) ? l : [] } else { c = l && ca.isPlainObject(l) ? l : {} } j[g] = ca.extend(b, c, h) } else { if (h !== undefined) { j[g] = h } } } } } return j
    }; ca.extend({
        expando: "jQuery" + (cO + Math.random()).replace(/\D/g, ""), isReady: true, error: function (a) { throw new Error(a) }, noop: function () { }, isFunction: function (a) { return ca.type(a) === "function" }, isArray: Array.isArray || function (a) { return ca.type(a) === "array" }, isWindow: function (a) { return a != null && a == a.window }, isNumeric: function (a) { return !ca.isArray(a) && (a - parseFloat(a) + 1) >= 0 }, isEmptyObject: function (a) {
            var b;
            for (b in a) { return false } return true
        }, isPlainObject: function (b) { var a; if (!b || ca.type(b) !== "object" || b.nodeType || ca.isWindow(b)) { return false } try { if (b.constructor && !dZ.call(b, "constructor") && !dZ.call(b.constructor.prototype, "isPrototypeOf")) { return false } } catch (c) { return false } if (d9.ownLast) { for (a in b) { return dZ.call(b, a) } } for (a in b) { } return a === undefined || dZ.call(b, a) }, type: function (a) { if (a == null) { return a + "" } return typeof a === "object" || typeof a === "function" ? c8[d8.call(a)] || "object" : typeof a }, globalEval: function (a) { if (a && ca.trim(a)) { (eg.execScript || function (b) { eg["eval"].call(eg, b) })(a) } }, camelCase: function (a) { return a.replace(cn, "ms-").replace(el, cK) }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase() }, each: function (f, a, h) {
            var c, g = 0, b = f.length, d = c5(f); if (h) {
                if (d) {
                    for (;
                        g < b; g++) { c = a.apply(f[g], h); if (c === false) { break } }
                } else { for (g in f) { c = a.apply(f[g], h); if (c === false) { break } } }
            } else { if (d) { for (; g < b; g++) { c = a.call(f[g], g, f[g]); if (c === false) { break } } } else { for (g in f) { c = a.call(f[g], g, f[g]); if (c === false) { break } } } } return f
        }, trim: function (a) { return a == null ? "" : (a + "").replace(d1, "") }, makeArray: function (b, c) { var a = c || []; if (b != null) { if (c5(Object(b))) { ca.merge(a, typeof b === "string" ? [b] : b) } else { dA.call(a, b) } } return a }, inArray: function (b, d, c) { var a; if (d) { if (d6) { return d6.call(d, b, c) } a = d.length; c = c ? c < 0 ? Math.max(0, a + c) : c : 0; for (; c < a; c++) { if (c in d && d[c] === b) { return c } } } return -1 }, merge: function (a, d) { var c = +d.length, f = 0, b = a.length; while (f < c) { a[b++] = d[f++] } if (c !== c) { while (d[f] !== undefined) { a[b++] = d[f++] } } a.length = b; return a }, grep: function (g, d, b) {
            var c, a = [], j = 0, h = g.length, f = !b; for (;
                j < h; j++) { c = !d(g[j], j); if (c !== f) { a.push(g[j]) } } return a
        }, map: function (h, g, d) { var c, b = 0, f = h.length, j = c5(h), a = []; if (j) { for (; b < f; b++) { c = g(h[b], b, d); if (c != null) { a.push(c) } } } else { for (b in h) { c = g(h[b], b, d); if (c != null) { a.push(c) } } } return di.apply([], a) }, guid: 1, proxy: function (c, d) { var b, f, a; if (typeof d === "string") { a = c[d]; d = c; c = a } if (!ca.isFunction(c)) { return undefined } b = dy.call(arguments, 2); f = function () { return c.apply(d || this, b.concat(dy.call(arguments))) }; f.guid = c.guid = c.guid || ca.guid++; return f }, now: function () { return +(new Date()) }, support: d9
    }); ca.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (b, a) { c8["[object " + a + "]"] = a.toLowerCase() }); function c5(c) {
        var a = "length" in c && c.length, b = ca.type(c); if (b === "function" || ca.isWindow(c)) { return false } if (c.nodeType === 1 && a) {
            return true
        } return b === "array" || a === 0 || typeof a === "number" && a > 0 && (a - 1) in c
    } var dp =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        (function (q) {
            var ao, an, F, ac, U, A, ab, m, b, aa, Y, W, r, aw, at, az, o, ay, al, f = "sizzle" + 1 * new Date(), X = q.document, am = 0, K = 0, aB = j(), h = j(), ak = j(), n = function (aE, aF) { if (aE === aF) { Y = true } return 0 }, ae = 1 << 31, P = ({}).hasOwnProperty, u = [], s = u.pop, R = u.push, aD = u.push, H = u.slice, N = function (aH, aE) { var aF = 0, aG = aH.length; for (; aF < aG; aF++) { if (aH[aF] === aE) { return aF } } return -1 }, aC = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", av = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", T = M.replace("w", "w#"), G = "\\[" + av + "*(" + M + ")(?:" + av + "*([*^$|!~]?=)" + av + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + T + "))|)" + av + "*\\]", L = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + G + ")*)|.*)\\)|)", v = new RegExp(av + "+", "g"), y = new RegExp("^" + av + "+|((?:^|[^\\\\])(?:\\\\.)*)" + av + "+$", "g"), k = new RegExp("^" + av + "*," + av + "*"), t = new RegExp("^" + av + "*([>+~]|" + av + ")" + av + "*"), w = new RegExp("=" + av + "*([^\\]'\"]*?)" + av + "*\\]", "g"), ah = new RegExp(L), af = new RegExp("^" + T + "$"), z = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + G), PSEUDO: new RegExp("^" + L), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + av + "*(even|odd|(([+-]|)(\\d*)n|)" + av + "*(?:([+-]|)" + av + "*(\\d+)|))" + av + "*\\)|)", "i"), bool: new RegExp("^(?:" + aC + ")$", "i"), needsContext: new RegExp("^" + av + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + av + "*((?:-\\d)?\\d*)" + av + "*\\)|)(?=[^-]|$)", "i") }, O = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, a = /^[^{]+\{\s*\[native \w/, ai = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, B = /[+~]/, Q = /'|\\/g, x = new RegExp("\\\\([\\da-f]{1,6}" + av + "?|(" + av + ")|.)", "ig"), I = function (aH, aE, aG) {
                var aF = "0x" + aE - 65536;
                return aF !== aF || aG ? aE : aF < 0 ? String.fromCharCode(aF + 65536) : String.fromCharCode(aF >> 10 | 55296, aF & 1023 | 56320)
            }, c = function () { W() }; try { aD.apply((u = H.call(X.childNodes)), X.childNodes); u[X.childNodes.length].nodeType } catch (p) { aD = { apply: u.length ? function (aE, aF) { R.apply(aE, H.call(aF)) } : function (aH, aE) { var aG = aH.length, aF = 0; while ((aH[aG++] = aE[aF++])) { } aH.length = aG - 1 } } } function aq(aJ, aR, aF, aP) {
                var aE, aM, aL, aH, aG, aN, aO, aS, aQ, aI; if ((aR ? aR.ownerDocument || aR : X) !== r) { W(aR) } aR = aR || r; aF = aF || []; aH = aR.nodeType; if (typeof aJ !== "string" || !aJ || aH !== 1 && aH !== 9 && aH !== 11) { return aF } if (!aP && at) {
                    if (aH !== 11 && (aE = ai.exec(aJ))) {
                        if ((aL = aE[1])) {
                            if (aH === 9) { aM = aR.getElementById(aL); if (aM && aM.parentNode) { if (aM.id === aL) { aF.push(aM); return aF } } else { return aF } } else {
                                if (aR.ownerDocument && (aM = aR.ownerDocument.getElementById(aL)) && al(aR, aM) && aM.id === aL) {
                                    aF.push(aM);
                                    return aF
                                }
                            }
                        } else { if (aE[2]) { aD.apply(aF, aR.getElementsByTagName(aJ)); return aF } else { if ((aL = aE[3]) && an.getElementsByClassName) { aD.apply(aF, aR.getElementsByClassName(aL)); return aF } } }
                    } if (an.qsa && (!az || !az.test(aJ))) { aS = aO = f; aQ = aR; aI = aH !== 1 && aJ; if (aH === 1 && aR.nodeName.toLowerCase() !== "object") { aN = A(aJ); if ((aO = aR.getAttribute("id"))) { aS = aO.replace(Q, "\\$&") } else { aR.setAttribute("id", aS) } aS = "[id='" + aS + "'] "; aG = aN.length; while (aG--) { aN[aG] = aS + C(aN[aG]) } aQ = B.test(aJ) && ag(aR.parentNode) || aR; aI = aN.join(",") } if (aI) { try { aD.apply(aF, aQ.querySelectorAll(aI)); return aF } catch (aK) { } finally { if (!aO) { aR.removeAttribute("id") } } } }
                } return m(aJ.replace(y, "$1"), aR, aF, aP)
            } function j() { var aE = []; function aF(aH, aG) { if (aE.push(aH + " ") > F.cacheLength) { delete aF[aE.shift()] } return (aF[aH + " "] = aG) } return aF } function aA(aE) {
            aE[f] = true;
                return aE
            } function ax(aG) { var aE = r.createElement("div"); try { return !!aG(aE) } catch (aF) { return false } finally { if (aE.parentNode) { aE.parentNode.removeChild(aE) } aE = null } } function aj(aF, aH) { var aG = aF.split("|"), aE = aF.length; while (aE--) { F.attrHandle[aG[aE]] = aH } } function D(aG, aH) { var aE = aH && aG, aF = aE && aG.nodeType === 1 && aH.nodeType === 1 && (~aH.sourceIndex || ae) - (~aG.sourceIndex || ae); if (aF) { return aF } if (aE) { while ((aE = aE.nextSibling)) { if (aE === aH) { return -1 } } } return aG ? 1 : -1 } function ap(aE) { return function (aF) { var aG = aF.nodeName.toLowerCase(); return aG === "input" && aF.type === aE } } function S(aE) { return function (aF) { var aG = aF.nodeName.toLowerCase(); return (aG === "input" || aG === "button") && aF.type === aE } } function au(aE) {
                return aA(function (aF) {
                    aF = +aF; return aA(function (aH, aI) {
                        var aK, aG = aE([], aH.length, aF), aJ = aG.length; while (aJ--) {
                            if (aH[(aK = aG[aJ])]) {
                            aH[aK] = !(aI[aK] = aH[aK])
                            }
                        }
                    })
                })
            } function ag(aE) { return aE && typeof aE.getElementsByTagName !== "undefined" && aE } an = aq.support = {}; U = aq.isXML = function (aF) { var aE = aF && (aF.ownerDocument || aF).documentElement; return aE ? aE.nodeName !== "HTML" : false }; W = aq.setDocument = function (aF) {
                var aH, aG, aE = aF ? aF.ownerDocument || aF : X; if (aE === r || aE.nodeType !== 9 || !aE.documentElement) { return r } r = aE; aw = aE.documentElement; aG = aE.defaultView; if (aG && aG !== aG.top) { if (aG.addEventListener) { aG.addEventListener("unload", c, false) } else { if (aG.attachEvent) { aG.attachEvent("onunload", c) } } } at = !U(aE); an.attributes = ax(function (aI) { aI.className = "i"; return !aI.getAttribute("className") }); an.getElementsByTagName = ax(function (aI) { aI.appendChild(aE.createComment("")); return !aI.getElementsByTagName("*").length }); an.getElementsByClassName = a.test(aE.getElementsByClassName); an.getById = ax(function (aI) {
                    aw.appendChild(aI).id = f;
                    return !aE.getElementsByName || !aE.getElementsByName(f).length
                }); if (an.getById) { F.find.ID = function (aI, aJ) { if (typeof aJ.getElementById !== "undefined" && at) { var aK = aJ.getElementById(aI); return aK && aK.parentNode ? [aK] : [] } }; F.filter.ID = function (aI) { var aJ = aI.replace(x, I); return function (aK) { return aK.getAttribute("id") === aJ } } } else { delete F.find.ID; F.filter.ID = function (aI) { var aJ = aI.replace(x, I); return function (aK) { var aL = typeof aK.getAttributeNode !== "undefined" && aK.getAttributeNode("id"); return aL && aL.value === aJ } } } F.find.TAG = an.getElementsByTagName ? function (aJ, aI) { if (typeof aI.getElementsByTagName !== "undefined") { return aI.getElementsByTagName(aJ) } else { if (an.qsa) { return aI.querySelectorAll(aJ) } } } : function (aN, aJ) {
                    var aI, aK = [], aL = 0, aM = aJ.getElementsByTagName(aN); if (aN === "*") {
                        while ((aI = aM[aL++])) {
                            if (aI.nodeType === 1) {
                                aK.push(aI)
                            }
                        } return aK
                    } return aM
                }; F.find.CLASS = an.getElementsByClassName && function (aI, aJ) { if (at) { return aJ.getElementsByClassName(aI) } }; o = []; az = []; if ((an.qsa = a.test(aE.querySelectorAll))) {
                    ax(function (aI) { aw.appendChild(aI).innerHTML = "<a id='" + f + "'></a><select id='" + f + "-\f]' msallowcapture=''><option selected=''></option></select>"; if (aI.querySelectorAll("[msallowcapture^='']").length) { az.push("[*^$]=" + av + "*(?:''|\"\")") } if (!aI.querySelectorAll("[selected]").length) { az.push("\\[" + av + "*(?:value|" + aC + ")") } if (!aI.querySelectorAll("[id~=" + f + "-]").length) { az.push("~=") } if (!aI.querySelectorAll(":checked").length) { az.push(":checked") } if (!aI.querySelectorAll("a#" + f + "+*").length) { az.push(".#.+[+~]") } }); ax(function (aI) {
                        var aJ = aE.createElement("input"); aJ.setAttribute("type", "hidden"); aI.appendChild(aJ).setAttribute("name", "D");
                        if (aI.querySelectorAll("[name=d]").length) { az.push("name" + av + "*[*^$|!~]?=") } if (!aI.querySelectorAll(":enabled").length) { az.push(":enabled", ":disabled") } aI.querySelectorAll("*,:x"); az.push(",.*:")
                    })
                } if ((an.matchesSelector = a.test((ay = aw.matches || aw.webkitMatchesSelector || aw.mozMatchesSelector || aw.oMatchesSelector || aw.msMatchesSelector)))) { ax(function (aI) { an.disconnectedMatch = ay.call(aI, "div"); ay.call(aI, "[s!='']:x"); o.push("!=", L) }) } az = az.length && new RegExp(az.join("|")); o = o.length && new RegExp(o.join("|")); aH = a.test(aw.compareDocumentPosition); al = aH || a.test(aw.contains) ? function (aK, aL) { var aI = aK.nodeType === 9 ? aK.documentElement : aK, aJ = aL && aL.parentNode; return aK === aJ || !!(aJ && aJ.nodeType === 1 && (aI.contains ? aI.contains(aJ) : aK.compareDocumentPosition && aK.compareDocumentPosition(aJ) & 16)) } : function (aI, aJ) {
                    if (aJ) {
                        while ((aJ = aJ.parentNode)) {
                            if (aJ === aI) {
                                return true
                            }
                        }
                    } return false
                }; n = aH ? function (aJ, aK) { if (aJ === aK) { Y = true; return 0 } var aI = !aJ.compareDocumentPosition - !aK.compareDocumentPosition; if (aI) { return aI } aI = (aJ.ownerDocument || aJ) === (aK.ownerDocument || aK) ? aJ.compareDocumentPosition(aK) : 1; if (aI & 1 || (!an.sortDetached && aK.compareDocumentPosition(aJ) === aI)) { if (aJ === aE || aJ.ownerDocument === X && al(X, aJ)) { return -1 } if (aK === aE || aK.ownerDocument === X && al(X, aK)) { return 1 } return aa ? (N(aa, aJ) - N(aa, aK)) : 0 } return aI & 4 ? -1 : 1 } : function (aO, aP) {
                    if (aO === aP) { Y = true; return 0 } var aI, aL = 0, aJ = aO.parentNode, aM = aP.parentNode, aN = [aO], aK = [aP]; if (!aJ || !aM) { return aO === aE ? -1 : aP === aE ? 1 : aJ ? -1 : aM ? 1 : aa ? (N(aa, aO) - N(aa, aP)) : 0 } else { if (aJ === aM) { return D(aO, aP) } } aI = aO; while ((aI = aI.parentNode)) { aN.unshift(aI) } aI = aP; while ((aI = aI.parentNode)) { aK.unshift(aI) } while (aN[aL] === aK[aL]) { aL++ } return aL ? D(aN[aL], aK[aL]) : aN[aL] === X ? -1 : aK[aL] === X ? 1 : 0
                }; return aE
            }; aq.matches = function (aE, aF) { return aq(aE, null, null, aF) }; aq.matchesSelector = function (aF, aH) { if ((aF.ownerDocument || aF) !== r) { W(aF) } aH = aH.replace(w, "='$1']"); if (an.matchesSelector && at && (!o || !o.test(aH)) && (!az || !az.test(aH))) { try { var aG = ay.call(aF, aH); if (aG || an.disconnectedMatch || aF.document && aF.document.nodeType !== 11) { return aG } } catch (aE) { } } return aq(aH, r, null, [aF]).length > 0 }; aq.contains = function (aF, aE) { if ((aF.ownerDocument || aF) !== r) { W(aF) } return al(aF, aE) }; aq.attr = function (aF, aH) { if ((aF.ownerDocument || aF) !== r) { W(aF) } var aG = F.attrHandle[aH.toLowerCase()], aE = aG && P.call(F.attrHandle, aH.toLowerCase()) ? aG(aF, aH, !at) : undefined; return aE !== undefined ? aE : an.attributes || !at ? aF.getAttribute(aH) : (aE = aF.getAttributeNode(aH)) && aE.specified ? aE.value : null }; aq.error = function (aE) {
                throw new Error("Syntax error, unrecognized expression: " + aE)
            }; aq.uniqueSort = function (aE) { var aI, aH = [], aG = 0, aF = 0; Y = !an.detectDuplicates; aa = !an.sortStable && aE.slice(0); aE.sort(n); if (Y) { while ((aI = aE[aF++])) { if (aI === aE[aF]) { aG = aH.push(aF) } } while (aG--) { aE.splice(aH[aG], 1) } } aa = null; return aE }; ac = aq.getText = function (aH) { var aI, aF = "", aE = 0, aG = aH.nodeType; if (!aG) { while ((aI = aH[aE++])) { aF += ac(aI) } } else { if (aG === 1 || aG === 9 || aG === 11) { if (typeof aH.textContent === "string") { return aH.textContent } else { for (aH = aH.firstChild; aH; aH = aH.nextSibling) { aF += ac(aH) } } } else { if (aG === 3 || aG === 4) { return aH.nodeValue } } } return aF }; F = aq.selectors = {
                cacheLength: 50, createPseudo: aA, match: z, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } }, preFilter: {
                    ATTR: function (aE) {
                    aE[1] = aE[1].replace(x, I);
                        aE[3] = (aE[3] || aE[4] || aE[5] || "").replace(x, I); if (aE[2] === "~=") { aE[3] = " " + aE[3] + " " } return aE.slice(0, 4)
                    }, CHILD: function (aE) { aE[1] = aE[1].toLowerCase(); if (aE[1].slice(0, 3) === "nth") { if (!aE[3]) { aq.error(aE[0]) } aE[4] = +(aE[4] ? aE[5] + (aE[6] || 1) : 2 * (aE[3] === "even" || aE[3] === "odd")); aE[5] = +((aE[7] + aE[8]) || aE[3] === "odd") } else { if (aE[3]) { aq.error(aE[0]) } } return aE }, PSEUDO: function (aF) { var aG, aE = !aF[6] && aF[2]; if (z.CHILD.test(aF[0])) { return null } if (aF[3]) { aF[2] = aF[4] || aF[5] || "" } else { if (aE && ah.test(aE) && (aG = A(aE, true)) && (aG = aE.indexOf(")", aE.length - aG) - aE.length)) { aF[0] = aF[0].slice(0, aG); aF[2] = aE.slice(0, aG) } } return aF.slice(0, 3) }
                }, filter: {
                    TAG: function (aE) { var aF = aE.replace(x, I).toLowerCase(); return aE === "*" ? function () { return true } : function (aG) { return aG.nodeName && aG.nodeName.toLowerCase() === aF } }, CLASS: function (aF) {
                        var aE = aB[aF + " "];
                        return aE || (aE = new RegExp("(^|" + av + ")" + aF + "(" + av + "|$)")) && aB(aF, function (aG) { return aE.test(typeof aG.className === "string" && aG.className || typeof aG.getAttribute !== "undefined" && aG.getAttribute("class") || "") })
                    }, ATTR: function (aE, aF, aG) { return function (aI) { var aH = aq.attr(aI, aE); if (aH == null) { return aF === "!=" } if (!aF) { return true } aH += ""; return aF === "=" ? aH === aG : aF === "!=" ? aH !== aG : aF === "^=" ? aG && aH.indexOf(aG) === 0 : aF === "*=" ? aG && aH.indexOf(aG) > -1 : aF === "$=" ? aG && aH.slice(-aG.length) === aG : aF === "~=" ? (" " + aH.replace(v, " ") + " ").indexOf(aG) > -1 : aF === "|=" ? aH === aG || aH.slice(0, aG.length + 1) === aG + "-" : false } }, CHILD: function (aG, aL, aE, aK, aF) {
                        var aH = aG.slice(0, 3) !== "nth", aJ = aG.slice(-4) !== "last", aI = aL === "of-type"; return aK === 1 && aF === 0 ? function (aM) { return !!aM.parentNode } : function (aV, aY, aS) {
                            var aQ, aO, aT, aP, aU, aX, aW = aH !== aJ ? "nextSibling" : "previousSibling", aR = aV.parentNode, aM = aI && aV.nodeName.toLowerCase(), aN = !aS && !aI;
                            if (aR) { if (aH) { while (aW) { aT = aV; while ((aT = aT[aW])) { if (aI ? aT.nodeName.toLowerCase() === aM : aT.nodeType === 1) { return false } } aX = aW = aG === "only" && !aX && "nextSibling" } return true } aX = [aJ ? aR.firstChild : aR.lastChild]; if (aJ && aN) { aO = aR[f] || (aR[f] = {}); aQ = aO[aG] || []; aU = aQ[0] === am && aQ[1]; aP = aQ[0] === am && aQ[2]; aT = aU && aR.childNodes[aU]; while ((aT = ++aU && aT && aT[aW] || (aP = aU = 0) || aX.pop())) { if (aT.nodeType === 1 && ++aP && aT === aV) { aO[aG] = [am, aU, aP]; break } } } else { if (aN && (aQ = (aV[f] || (aV[f] = {}))[aG]) && aQ[0] === am) { aP = aQ[1] } else { while ((aT = ++aU && aT && aT[aW] || (aP = aU = 0) || aX.pop())) { if ((aI ? aT.nodeName.toLowerCase() === aM : aT.nodeType === 1) && ++aP) { if (aN) { (aT[f] || (aT[f] = {}))[aG] = [am, aP] } if (aT === aV) { break } } } } } aP -= aF; return aP === aK || (aP % aK === 0 && aP / aK >= 0) }
                        }
                    }, PSEUDO: function (aE, aF) {
                        var aH, aG = F.pseudos[aE] || F.setFilters[aE.toLowerCase()] || aq.error("unsupported pseudo: " + aE);
                        if (aG[f]) { return aG(aF) } if (aG.length > 1) { aH = [aE, aE, "", aF]; return F.setFilters.hasOwnProperty(aE.toLowerCase()) ? aA(function (aK, aI) { var aL, aM = aG(aK, aF), aJ = aM.length; while (aJ--) { aL = N(aK, aM[aJ]); aK[aL] = !(aI[aL] = aM[aJ]) } }) : function (aI) { return aG(aI, 0, aH) } } return aG
                    }
                }, pseudos: {
                    not: aA(function (aH) { var aG = [], aF = [], aE = ab(aH.replace(y, "$1")); return aE[f] ? aA(function (aN, aI, aK, aM) { var aJ, aO = aE(aN, null, aM, []), aL = aN.length; while (aL--) { if ((aJ = aO[aL])) { aN[aL] = !(aI[aL] = aJ) } } }) : function (aI, aJ, aK) { aG[0] = aI; aE(aG, null, aK, aF); aG[0] = null; return !aF.pop() } }), has: aA(function (aE) { return function (aF) { return aq(aE, aF).length > 0 } }), contains: aA(function (aE) { aE = aE.replace(x, I); return function (aF) { return (aF.textContent || aF.innerText || ac(aF)).indexOf(aE) > -1 } }), lang: aA(function (aE) {
                        if (!af.test(aE || "")) {
                            aq.error("unsupported lang: " + aE)
                        } aE = aE.replace(x, I).toLowerCase(); return function (aF) { var aG; do { if ((aG = at ? aF.lang : aF.getAttribute("xml:lang") || aF.getAttribute("lang"))) { aG = aG.toLowerCase(); return aG === aE || aG.indexOf(aE + "-") === 0 } } while ((aF = aF.parentNode) && aF.nodeType === 1); return false }
                    }), target: function (aF) { var aE = q.location && q.location.hash; return aE && aE.slice(1) === aF.id }, root: function (aE) { return aE === aw }, focus: function (aE) { return aE === r.activeElement && (!r.hasFocus || r.hasFocus()) && !!(aE.type || aE.href || ~aE.tabIndex) }, enabled: function (aE) { return aE.disabled === false }, disabled: function (aE) { return aE.disabled === true }, checked: function (aF) { var aE = aF.nodeName.toLowerCase(); return (aE === "input" && !!aF.checked) || (aE === "option" && !!aF.selected) }, selected: function (aE) {
                        if (aE.parentNode) { aE.parentNode.selectedIndex } return aE.selected === true
                    }, empty: function (aE) { for (aE = aE.firstChild; aE; aE = aE.nextSibling) { if (aE.nodeType < 6) { return false } } return true }, parent: function (aE) { return !F.pseudos.empty(aE) }, header: function (aE) { return J.test(aE.nodeName) }, input: function (aE) { return O.test(aE.nodeName) }, button: function (aE) { var aF = aE.nodeName.toLowerCase(); return aF === "input" && aE.type === "button" || aF === "button" }, text: function (aE) { var aF; return aE.nodeName.toLowerCase() === "input" && aE.type === "text" && ((aF = aE.getAttribute("type")) == null || aF.toLowerCase() === "text") }, first: au(function () { return [0] }), last: au(function (aF, aE) { return [aE - 1] }), eq: au(function (aG, aE, aF) { return [aF < 0 ? aF + aE : aF] }), even: au(function (aG, aE) { var aF = 0; for (; aF < aE; aF += 2) { aG.push(aF) } return aG }), odd: au(function (aG, aE) { var aF = 1; for (; aF < aE; aF += 2) { aG.push(aF) } return aG }), lt: au(function (aG, aH, aE) {
                        var aF = aE < 0 ? aE + aH : aE;
                        for (; --aF >= 0;) { aG.push(aF) } return aG
                    }), gt: au(function (aG, aH, aE) { var aF = aE < 0 ? aE + aH : aE; for (; ++aF < aH;) { aG.push(aF) } return aG })
                }
            }; F.pseudos.nth = F.pseudos.eq; for (ao in { radio: true, checkbox: true, file: true, password: true, image: true }) { F.pseudos[ao] = ap(ao) } for (ao in { submit: true, reset: true }) { F.pseudos[ao] = S(ao) } function ad() { } ad.prototype = F.filters = F.pseudos; F.setFilters = new ad(); A = aq.tokenize = function (aL, aG) {
                var aN, aK, aI, aH, aJ, aE, aF, aM = h[aL + " "]; if (aM) { return aG ? 0 : aM.slice(0) } aJ = aL; aE = []; aF = F.preFilter; while (aJ) {
                    if (!aN || (aK = k.exec(aJ))) { if (aK) { aJ = aJ.slice(aK[0].length) || aJ } aE.push((aI = [])) } aN = false; if ((aK = t.exec(aJ))) { aN = aK.shift(); aI.push({ value: aN, type: aK[0].replace(y, " ") }); aJ = aJ.slice(aN.length) } for (aH in F.filter) {
                        if ((aK = z[aH].exec(aJ)) && (!aF[aH] || (aK = aF[aH](aK)))) {
                            aN = aK.shift(); aI.push({ value: aN, type: aH, matches: aK });
                            aJ = aJ.slice(aN.length)
                        }
                    } if (!aN) { break }
                } return aG ? aJ.length : aJ ? aq.error(aL) : h(aL, aE).slice(0)
            }; function C(aH) { var aE = 0, aF = aH.length, aG = ""; for (; aE < aF; aE++) { aG += aH[aE].value } return aG } function ar(aJ, aF, aE) { var aH = aF.dir, aI = aE && aH === "parentNode", aG = K++; return aF.first ? function (aK, aL, aM) { while ((aK = aK[aH])) { if (aK.nodeType === 1 || aI) { return aJ(aK, aL, aM) } } } : function (aL, aN, aO) { var aK, aM, aP = [am, aG]; if (aO) { while ((aL = aL[aH])) { if (aL.nodeType === 1 || aI) { if (aJ(aL, aN, aO)) { return true } } } } else { while ((aL = aL[aH])) { if (aL.nodeType === 1 || aI) { aM = aL[f] || (aL[f] = {}); if ((aK = aM[aH]) && aK[0] === am && aK[1] === aG) { return (aP[2] = aK[2]) } else { aM[aH] = aP; if ((aP[2] = aJ(aL, aN, aO))) { return true } } } } } } } function d(aE) { return aE.length > 1 ? function (aH, aI, aG) { var aF = aE.length; while (aF--) { if (!aE[aF](aH, aI, aG)) { return false } } return true } : aE[0] } function l(aF, aH, aI) {
                var aE = 0, aG = aH.length;
                for (; aE < aG; aE++) { aq(aF, aH[aE], aI) } return aI
            } function V(aF, aE, aN, aM, aJ) { var aL, aG = [], aK = 0, aI = aF.length, aH = aE != null; for (; aK < aI; aK++) { if ((aL = aF[aK])) { if (!aN || aN(aL, aM, aJ)) { aG.push(aL); if (aH) { aE.push(aK) } } } } return aG } function E(aF, aG, aJ, aE, aI, aH) {
                if (aE && !aE[f]) { aE = E(aE) } if (aI && !aI[f]) { aI = E(aI, aH) } return aA(function (aK, aN, aS, aL) {
                    var aW, aM, aQ, aR = [], aV = [], aT = aN.length, aU = aK || l(aG || "*", aS.nodeType ? [aS] : aS, []), aP = aF && (aK || !aG) ? V(aU, aR, aF, aS, aL) : aU, aO = aJ ? aI || (aK ? aF : aT || aE) ? [] : aN : aP; if (aJ) { aJ(aP, aO, aS, aL) } if (aE) { aW = V(aO, aV); aE(aW, [], aS, aL); aM = aW.length; while (aM--) { if ((aQ = aW[aM])) { aO[aV[aM]] = !(aP[aV[aM]] = aQ) } } } if (aK) {
                        if (aI || aF) {
                            if (aI) { aW = []; aM = aO.length; while (aM--) { if ((aQ = aO[aM])) { aW.push((aP[aM] = aQ)) } } aI(null, (aO = []), aW, aL) } aM = aO.length; while (aM--) {
                                if ((aQ = aO[aM]) && (aW = aI ? N(aK, aQ) : aR[aM]) > -1) {
                                aK[aW] = !(aN[aW] = aQ)
                                }
                            }
                        }
                    } else { aO = V(aO === aN ? aO.splice(aT, aO.length) : aO); if (aI) { aI(null, aN, aO, aL) } else { aD.apply(aN, aO) } }
                })
            } function g(aM) {
                var aG, aO, aF, aN = aM.length, aJ = F.relative[aM[0].type], aI = aJ || F.relative[" "], aE = aJ ? 1 : 0, aL = ar(function (aP) { return aP === aG }, aI, true), aK = ar(function (aP) { return N(aG, aP) > -1 }, aI, true), aH = [function (aP, aQ, aR) { var aS = (!aJ && (aR || aQ !== b)) || ((aG = aQ).nodeType ? aL(aP, aQ, aR) : aK(aP, aQ, aR)); aG = null; return aS }]; for (; aE < aN; aE++) { if ((aO = F.relative[aM[aE].type])) { aH = [ar(d(aH), aO)] } else { aO = F.filter[aM[aE].type].apply(null, aM[aE].matches); if (aO[f]) { aF = ++aE; for (; aF < aN; aF++) { if (F.relative[aM[aF].type]) { break } } return E(aE > 1 && d(aH), aE > 1 && C(aM.slice(0, aE - 1).concat({ value: aM[aE - 2].type === " " ? "*" : "" })).replace(y, "$1"), aO, aE < aF && g(aM.slice(aE, aF)), aF < aN && g((aM = aM.slice(aF))), aF < aN && C(aM)) } aH.push(aO) } } return d(aH)
            } function Z(aE, aF) { var aH = aF.length > 0, aI = aE.length > 0, aG = function (aJ, aT, aL, aP, aY) { var aK, aX, aV, aO = 0, aR = "0", aW = aJ && [], aN = [], aU = b, aM = aJ || aI && F.find.TAG("*", aY), aS = (am += aU == null ? 1 : Math.random() || 0.1), aQ = aM.length; if (aY) { b = aT !== r && aT } for (; aR !== aQ && (aK = aM[aR]) != null; aR++) { if (aI && aK) { aX = 0; while ((aV = aE[aX++])) { if (aV(aK, aT, aL)) { aP.push(aK); break } } if (aY) { am = aS } } if (aH) { if ((aK = !aV && aK)) { aO-- } if (aJ) { aW.push(aK) } } } aO += aR; if (aH && aR !== aO) { aX = 0; while ((aV = aF[aX++])) { aV(aW, aN, aT, aL) } if (aJ) { if (aO > 0) { while (aR--) { if (!(aW[aR] || aN[aR])) { aN[aR] = s.call(aP) } } } aN = V(aN) } aD.apply(aP, aN); if (aY && !aJ && aN.length > 0 && (aO + aF.length) > 1) { aq.uniqueSort(aP) } } if (aY) { am = aS; b = aU } return aW }; return aH ? aA(aG) : aG } ab = aq.compile = function (aH, aE) {
                var aJ, aF = [], aG = [], aI = ak[aH + " "]; if (!aI) {
                    if (!aE) { aE = A(aH) } aJ = aE.length; while (aJ--) {
                        aI = g(aE[aJ]);
                        if (aI[f]) { aF.push(aI) } else { aG.push(aI) }
                    } aI = ak(aH, Z(aG, aF)); aI.selector = aH
                } return aI
            }; m = aq.select = function (aF, aH, aE, aM) {
                var aO, aJ, aG, aI, aL, aK = typeof aF === "function" && aF, aN = !aM && A((aF = aK.selector || aF)); aE = aE || []; if (aN.length === 1) { aJ = aN[0] = aN[0].slice(0); if (aJ.length > 2 && (aG = aJ[0]).type === "ID" && an.getById && aH.nodeType === 9 && at && F.relative[aJ[1].type]) { aH = (F.find.ID(aG.matches[0].replace(x, I), aH) || [])[0]; if (!aH) { return aE } else { if (aK) { aH = aH.parentNode } } aF = aF.slice(aJ.shift().value.length) } aO = z.needsContext.test(aF) ? 0 : aJ.length; while (aO--) { aG = aJ[aO]; if (F.relative[(aI = aG.type)]) { break } if ((aL = F.find[aI])) { if ((aM = aL(aG.matches[0].replace(x, I), B.test(aJ[0].type) && ag(aH.parentNode) || aH))) { aJ.splice(aO, 1); aF = aM.length && C(aJ); if (!aF) { aD.apply(aE, aM); return aE } break } } } } (aK || ab(aF, aN))(aM, aH, !at, aE, B.test(aF) && ag(aH.parentNode) || aH);
                return aE
            }; an.sortStable = f.split("").sort(n).join("") === f; an.detectDuplicates = !!Y; W(); an.sortDetached = ax(function (aE) { return aE.compareDocumentPosition(r.createElement("div")) & 1 }); if (!ax(function (aE) { aE.innerHTML = "<a href='#'></a>"; return aE.firstChild.getAttribute("href") === "#" })) { aj("type|href|height|width", function (aF, aG, aE) { if (!aE) { return aF.getAttribute(aG, aG.toLowerCase() === "type" ? 1 : 2) } }) } if (!an.attributes || !ax(function (aE) { aE.innerHTML = "<input/>"; aE.firstChild.setAttribute("value", ""); return aE.firstChild.getAttribute("value") === "" })) { aj("value", function (aF, aG, aE) { if (!aE && aF.nodeName.toLowerCase() === "input") { return aF.defaultValue } }) } if (!ax(function (aE) { return aE.getAttribute("disabled") == null })) {
                aj(aC, function (aG, aH, aE) {
                    var aF; if (!aE) {
                        return aG[aH] === true ? aH.toLowerCase() : (aF = aG.getAttributeNode(aH)) && aF.specified ? aF.value : null
                    }
                })
            } return aq
        })(eg); ca.find = dp; ca.expr = dp.selectors; ca.expr[":"] = ca.expr.pseudos; ca.unique = dp.uniqueSort; ca.text = dp.getText; ca.isXMLDoc = dp.isXML; ca.contains = dp.contains; var cF = ca.expr.match.needsContext; var es = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/); var c4 = /^.[^:#\[\.,]*$/; function co(c, b, a) { if (ca.isFunction(b)) { return ca.grep(c, function (d, f) { return !!b.call(d, f, d) !== a }) } if (b.nodeType) { return ca.grep(c, function (d) { return (d === b) !== a }) } if (typeof b === "string") { if (c4.test(b)) { return ca.filter(b, c, a) } b = ca.filter(b, c) } return ca.grep(c, function (d) { return (ca.inArray(d, b) >= 0) !== a }) } ca.filter = function (c, b, d) { var a = b[0]; if (d) { c = ":not(" + c + ")" } return b.length === 1 && a.nodeType === 1 ? ca.find.matchesSelector(a, c) ? [a] : [] : ca.find.matches(c, ca.grep(b, function (f) { return f.nodeType === 1 })) }; ca.fn.extend({
            find: function (f) {
                var a, c = [], d = this, b = d.length;
                if (typeof f !== "string") { return this.pushStack(ca(f).filter(function () { for (a = 0; a < b; a++) { if (ca.contains(d[a], this)) { return true } } })) } for (a = 0; a < b; a++) { ca.find(f, d[a], c) } c = this.pushStack(b > 1 ? ca.unique(c) : c); c.selector = this.selector ? this.selector + " " + f : f; return c
            }, filter: function (a) { return this.pushStack(co(this, a || [], false)) }, not: function (a) { return this.pushStack(co(this, a || [], true)) }, is: function (a) { return !!co(this, typeof a === "string" && cF.test(a) ? ca(a) : a || [], false).length }
        }); var dl, eB = eg.document, dd = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, eH = ca.fn.init = function (b, d) {
            var a, c; if (!b) { return this } if (typeof b === "string") {
                if (b.charAt(0) === "<" && b.charAt(b.length - 1) === ">" && b.length >= 3) { a = [null, b, null] } else { a = dd.exec(b) } if (a && (a[1] || !d)) {
                    if (a[1]) {
                        d = d instanceof ca ? d[0] : d; ca.merge(this, ca.parseHTML(a[1], d && d.nodeType ? d.ownerDocument || d : eB, true));
                        if (es.test(a[1]) && ca.isPlainObject(d)) { for (a in d) { if (ca.isFunction(this[a])) { this[a](d[a]) } else { this.attr(a, d[a]) } } } return this
                    } else { c = eB.getElementById(a[2]); if (c && c.parentNode) { if (c.id !== a[2]) { return dl.find(b) } this.length = 1; this[0] = c } this.context = eB; this.selector = b; return this }
                } else { if (!d || d.jquery) { return (d || dl).find(b) } else { return this.constructor(d).find(b) } }
            } else { if (b.nodeType) { this.context = this[0] = b; this.length = 1; return this } else { if (ca.isFunction(b)) { return typeof dl.ready !== "undefined" ? dl.ready(b) : b(ca) } } } if (b.selector !== undefined) { this.selector = b.selector; this.context = b.context } return ca.makeArray(b, this)
        }; eH.prototype = ca.fn; dl = ca(eB); var cv = /^(?:parents|prev(?:Until|All))/, cl = { children: true, contents: true, next: true, prev: true }; ca.extend({
            dir: function (f, a, c) {
                var b = [], d = f[a]; while (d && d.nodeType !== 9 && (c === undefined || d.nodeType !== 1 || !ca(d).is(c))) {
                    if (d.nodeType === 1) {
                        b.push(d)
                    } d = d[a]
                } return b
            }, sibling: function (c, a) { var b = []; for (; c; c = c.nextSibling) { if (c.nodeType === 1 && c !== a) { b.push(c) } } return b }
        }); ca.fn.extend({
            has: function (b) { var c, d = ca(b, this), a = d.length; return this.filter(function () { for (c = 0; c < a; c++) { if (ca.contains(this, d[c])) { return true } } }) }, closest: function (f, c) { var b, g = 0, h = this.length, d = [], a = cF.test(f) || typeof f !== "string" ? ca(f, c || this.context) : 0; for (; g < h; g++) { for (b = this[g]; b && b !== c; b = b.parentNode) { if (b.nodeType < 11 && (a ? a.index(b) > -1 : b.nodeType === 1 && ca.find.matchesSelector(b, f))) { d.push(b); break } } } return this.pushStack(d.length > 1 ? ca.unique(d) : d) }, index: function (a) { if (!a) { return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1 } if (typeof a === "string") { return ca.inArray(this[0], ca(a)) } return ca.inArray(a.jquery ? a[0] : a, this) }, add: function (b, a) {
                return this.pushStack(ca.unique(ca.merge(this.get(), ca(b, a))))
            }, addBack: function (a) { return this.add(a == null ? this.prevObject : this.prevObject.filter(a)) }
        }); function cM(a, b) { do { a = a[b] } while (a && a.nodeType !== 1); return a } ca.each({
            parent: function (a) { var b = a.parentNode; return b && b.nodeType !== 11 ? b : null }, parents: function (a) { return ca.dir(a, "parentNode") }, parentsUntil: function (c, a, b) { return ca.dir(c, "parentNode", b) }, next: function (a) { return cM(a, "nextSibling") }, prev: function (a) { return cM(a, "previousSibling") }, nextAll: function (a) { return ca.dir(a, "nextSibling") }, prevAll: function (a) { return ca.dir(a, "previousSibling") }, nextUntil: function (c, a, b) { return ca.dir(c, "nextSibling", b) }, prevUntil: function (c, a, b) { return ca.dir(c, "previousSibling", b) }, siblings: function (a) { return ca.sibling((a.parentNode || {}).firstChild, a) }, children: function (a) { return ca.sibling(a.firstChild) }, contents: function (a) {
                return ca.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ca.merge([], a.childNodes)
            }
        }, function (b, a) { ca.fn[b] = function (c, f) { var d = ca.map(this, a, c); if (b.slice(-5) !== "Until") { f = c } if (f && typeof f === "string") { d = ca.filter(f, d) } if (this.length > 1) { if (!cl[b]) { d = ca.unique(d) } if (cv.test(b)) { d = d.reverse() } } return this.pushStack(d) } }); var dT = (/\S+/g); var cu = {}; function dz(a) { var b = cu[a] = {}; ca.each(a.match(dT) || [], function (c, d) { b[d] = true }); return b } ca.Callbacks = function (a) {
            a = typeof a === "string" ? (cu[a] || dz(a)) : ca.extend({}, a); var g, h, m, l, k, j, d = [], c = !a.once && [], f = function (n) { h = a.memory && n; m = true; k = j || 0; j = 0; l = d.length; g = true; for (; d && k < l; k++) { if (d[k].apply(n[0], n[1]) === false && a.stopOnFalse) { h = false; break } } g = false; if (d) { if (c) { if (c.length) { f(c.shift()) } } else { if (h) { d = [] } else { b.disable() } } } }, b = {
                add: function () {
                    if (d) {
                        var n = d.length; (function o(p) {
                            ca.each(p, function (r, s) {
                                var q = ca.type(s); if (q === "function") {
                                    if (!a.unique || !b.has(s)) {
                                        d.push(s)
                                    }
                                } else { if (s && s.length && q !== "string") { o(s) } }
                            })
                        })(arguments); if (g) { l = d.length } else { if (h) { j = n; f(h) } }
                    } return this
                }, remove: function () { if (d) { ca.each(arguments, function (n, p) { var o; while ((o = ca.inArray(p, d, o)) > -1) { d.splice(o, 1); if (g) { if (o <= l) { l-- } if (o <= k) { k-- } } } }) } return this }, has: function (n) { return n ? ca.inArray(n, d) > -1 : !!(d && d.length) }, empty: function () { d = []; l = 0; return this }, disable: function () { d = c = h = undefined; return this }, disabled: function () { return !d }, lock: function () { c = undefined; if (!h) { b.disable() } return this }, locked: function () { return !c }, fireWith: function (n, o) { if (d && (!m || c)) { o = o || []; o = [n, o.slice ? o.slice() : o]; if (g) { c.push(o) } else { f(o) } } return this }, fire: function () { b.fireWith(this, arguments); return this }, fired: function () { return !!m }
            }; return b
        }; ca.extend({
            Deferred: function (f) {
                var a = [["resolve", "done", ca.Callbacks("once memory"), "resolved"], ["reject", "fail", ca.Callbacks("once memory"), "rejected"], ["notify", "progress", ca.Callbacks("memory")]], d = "pending", c = {
                    state: function () {
                        return d
                    }, always: function () { b.done(arguments).fail(arguments); return this }, then: function () { var g = arguments; return ca.Deferred(function (h) { ca.each(a, function (j, k) { var l = ca.isFunction(g[j]) && g[j]; b[k[1]](function () { var m = l && l.apply(this, arguments); if (m && ca.isFunction(m.promise)) { m.promise().done(h.resolve).fail(h.reject).progress(h.notify) } else { h[k[0] + "With"](this === c ? h.promise() : this, l ? [m] : arguments) } }) }); g = null }).promise() }, promise: function (g) { return g != null ? ca.extend(g, c) : c }
                }, b = {}; c.pipe = c.then; ca.each(a, function (j, k) { var g = k[2], h = k[3]; c[k[1]] = g.add; if (h) { g.add(function () { d = h }, a[j ^ 1][2].disable, a[2][2].lock) } b[k[0]] = function () { b[k[0] + "With"](this === b ? c : this, arguments); return this }; b[k[0] + "With"] = g.fireWith }); c.promise(b); if (f) { f.call(b, b) } return b
            }, when: function (k) {
                var g = 0, d = dy.call(arguments), l = d.length, h = l !== 1 || (k && ca.isFunction(k.promise)) ? l : 0, a = h === 1 ? k : ca.Deferred(), f = function (n, m, o) {
                    return function (p) {
                    m[n] = this;
                        o[n] = arguments.length > 1 ? dy.call(arguments) : p; if (o === b) { a.notifyWith(m, o) } else { if (!(--h)) { a.resolveWith(m, o) } }
                    }
                }, b, j, c; if (l > 1) { b = new Array(l); j = new Array(l); c = new Array(l); for (; g < l; g++) { if (d[g] && ca.isFunction(d[g].promise)) { d[g].promise().done(f(g, c, d)).fail(a.reject).progress(f(g, j, b)) } else { --h } } } if (!h) { a.resolveWith(c, d) } return a.promise()
            }
        }); var c1; ca.fn.ready = function (a) { ca.ready.promise().done(a); return this }; ca.extend({ isReady: false, readyWait: 1, holdReady: function (a) { if (a) { ca.readyWait++ } else { ca.ready(true) } }, ready: function (a) { if (a === true ? --ca.readyWait : ca.isReady) { return } if (!eB.body) { return setTimeout(ca.ready) } ca.isReady = true; if (a !== true && --ca.readyWait > 0) { return } c1.resolveWith(eB, [ca]); if (ca.fn.triggerHandler) { ca(eB).triggerHandler("ready"); ca(eB).off("ready") } } }); function dN() {
            if (eB.addEventListener) {
                eB.removeEventListener("DOMContentLoaded", ee, false);
                eg.removeEventListener("load", ee, false)
            } else { eB.detachEvent("onreadystatechange", ee); eg.detachEvent("onload", ee) }
        } function ee() { if (eB.addEventListener || event.type === "load" || eB.readyState === "complete") { dN(); ca.ready() } } ca.ready.promise = function (b) { if (!c1) { c1 = ca.Deferred(); if (eB.readyState === "complete") { setTimeout(ca.ready) } else { if (eB.addEventListener) { eB.addEventListener("DOMContentLoaded", ee, false); eg.addEventListener("load", ee, false) } else { eB.attachEvent("onreadystatechange", ee); eg.attachEvent("onload", ee); var c = false; try { c = eg.frameElement == null && eB.documentElement } catch (d) { } if (c && c.doScroll) { (function a() { if (!ca.isReady) { try { c.doScroll("left") } catch (f) { return setTimeout(a, 50) } dN(); ca.ready() } })() } } } } return c1.promise(b) }; var dv = typeof undefined; var d4; for (d4 in ca(d9)) { break } d9.ownLast = d4 !== "0";
    d9.inlineBlockNeedsLayout = false; ca(function () { var d, c, b, a; b = eB.getElementsByTagName("body")[0]; if (!b || !b.style) { return } c = eB.createElement("div"); a = eB.createElement("div"); a.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"; b.appendChild(a).appendChild(c); if (typeof c.style.zoom !== dv) { c.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"; d9.inlineBlockNeedsLayout = d = c.offsetWidth === 3; if (d) { b.style.zoom = 1 } } b.removeChild(a) }); (function () { var b = eB.createElement("div"); if (d9.deleteExpando == null) { d9.deleteExpando = true; try { delete b.test } catch (a) { d9.deleteExpando = false } } b = null })(); ca.acceptData = function (c) { var a = ca.noData[(c.nodeName + " ").toLowerCase()], b = +c.nodeType || 1; return b !== 1 && b !== 9 ? false : !a || a !== true && c.getAttribute("classid") === a }; var cf = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ct = /([A-Z])/g;
    function ce(d, f, c) { if (c === undefined && d.nodeType === 1) { var a = "data-" + f.replace(ct, "-$1").toLowerCase(); c = d.getAttribute(a); if (typeof c === "string") { try { c = c === "true" ? true : c === "false" ? false : c === "null" ? null : +c + "" === c ? +c : cf.test(c) ? ca.parseJSON(c) : c } catch (b) { } ca.data(d, f, c) } else { c = undefined } } return c } function c7(a) { var b; for (b in a) { if (b === "data" && ca.isEmptyObject(a[b])) { continue } if (b !== "toJSON") { return false } } return true } function dt(l, j, k, f) {
        if (!ca.acceptData(l)) { return } var c, h, b = ca.expando, a = l.nodeType, g = a ? ca.cache : l, d = a ? l[b] : l[b] && b; if ((!d || !g[d] || (!f && !g[d].data)) && k === undefined && typeof j === "string") { return } if (!d) { if (a) { d = l[b] = dW.pop() || ca.guid++ } else { d = b } } if (!g[d]) { g[d] = a ? {} : { toJSON: ca.noop } } if (typeof j === "object" || typeof j === "function") {
            if (f) { g[d] = ca.extend(g[d], j) } else {
                g[d].data = ca.extend(g[d].data, j)
            }
        } h = g[d]; if (!f) { if (!h.data) { h.data = {} } h = h.data } if (k !== undefined) { h[ca.camelCase(j)] = k } if (typeof j === "string") { c = h[j]; if (c == null) { c = h[ca.camelCase(j)] } } else { c = h } return c
    } function cX(b, h, g) { if (!ca.acceptData(b)) { return } var c, a, f = b.nodeType, j = f ? ca.cache : b, d = f ? b[ca.expando] : ca.expando; if (!j[d]) { return } if (h) { c = g ? j[d] : j[d].data; if (c) { if (!ca.isArray(h)) { if (h in c) { h = [h] } else { h = ca.camelCase(h); if (h in c) { h = [h] } else { h = h.split(" ") } } } else { h = h.concat(ca.map(h, ca.camelCase)) } a = h.length; while (a--) { delete c[h[a]] } if (g ? !c7(c) : !ca.isEmptyObject(c)) { return } } } if (!g) { delete j[d].data; if (!c7(j[d])) { return } } if (f) { ca.cleanData([b], true) } else { if (d9.deleteExpando || j != j.window) { delete j[d] } else { j[d] = null } } } ca.extend({
        cache: {}, noData: { "applet ": true, "embed ": true, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (a) {
            a = a.nodeType ? ca.cache[a[ca.expando]] : a[ca.expando];
            return !!a && !c7(a)
        }, data: function (a, b, c) { return dt(a, b, c) }, removeData: function (a, b) { return cX(a, b) }, _data: function (a, b, c) { return dt(a, b, c, true) }, _removeData: function (a, b) { return cX(a, b, true) }
    }); ca.fn.extend({ data: function (f, a) { var g, h, b, c = this[0], d = c && c.attributes; if (f === undefined) { if (this.length) { b = ca.data(c); if (c.nodeType === 1 && !ca._data(c, "parsedAttrs")) { g = d.length; while (g--) { if (d[g]) { h = d[g].name; if (h.indexOf("data-") === 0) { h = ca.camelCase(h.slice(5)); ce(c, h, b[h]) } } } ca._data(c, "parsedAttrs", true) } } return b } if (typeof f === "object") { return this.each(function () { ca.data(this, f) }) } return arguments.length > 1 ? this.each(function () { ca.data(this, f, a) }) : c ? ce(c, f, ca.data(c, f)) : undefined }, removeData: function (a) { return this.each(function () { ca.removeData(this, a) }) } }); ca.extend({
        queue: function (d, a, c) {
            var b; if (d) {
                a = (a || "fx") + "queue";
                b = ca._data(d, a); if (c) { if (!b || ca.isArray(c)) { b = ca._data(d, a, ca.makeArray(c)) } else { b.push(c) } } return b || []
            }
        }, dequeue: function (f, c) { c = c || "fx"; var a = ca.queue(f, c), b = a.length, g = a.shift(), d = ca._queueHooks(f, c), h = function () { ca.dequeue(f, c) }; if (g === "inprogress") { g = a.shift(); b-- } if (g) { if (c === "fx") { a.unshift("inprogress") } delete d.stop; g.call(f, h, d) } if (!b && d) { d.empty.fire() } }, _queueHooks: function (c, a) { var b = a + "queueHooks"; return ca._data(c, b) || ca._data(c, b, { empty: ca.Callbacks("once memory").add(function () { ca._removeData(c, a + "queue"); ca._removeData(c, b) }) }) }
    }); ca.fn.extend({
        queue: function (b, a) {
            var c = 2; if (typeof b !== "string") { a = b; b = "fx"; c-- } if (arguments.length < c) { return ca.queue(this[0], b) } return a === undefined ? this : this.each(function () {
                var d = ca.queue(this, b, a); ca._queueHooks(this, b); if (b === "fx" && d[0] !== "inprogress") {
                    ca.dequeue(this, b)
                }
            })
        }, dequeue: function (a) { return this.each(function () { ca.dequeue(this, a) }) }, clearQueue: function (a) { return this.queue(a || "fx", []) }, promise: function (h, g) { var j, c = 1, d = ca.Deferred(), f = this, a = this.length, b = function () { if (!(--c)) { d.resolveWith(f, [f]) } }; if (typeof h !== "string") { g = h; h = undefined } h = h || "fx"; while (a--) { j = ca._data(f[a], h + "queueHooks"); if (j && j.empty) { c++; j.empty.add(b) } } b(); return d.promise(g) }
    }); var cz = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source; var dD = ["Top", "Right", "Bottom", "Left"]; var dL = function (a, b) { a = b || a; return ca.css(a, "display") === "none" || !ca.contains(a.ownerDocument, a) }; var cD = ca.access = function (l, j, c, h, f, a, b) {
        var g = 0, d = l.length, k = c == null; if (ca.type(c) === "object") { f = true; for (g in c) { ca.access(l, j, g, c[g], true, a, b) } } else {
            if (h !== undefined) {
                f = true; if (!ca.isFunction(h)) { b = true } if (k) {
                    if (b) {
                        j.call(l, h);
                        j = null
                    } else { k = j; j = function (o, m, n) { return k.call(ca(o), n) } }
                } if (j) { for (; g < d; g++) { j(l[g], c, b ? h : h.call(l[g], g, j(l[g], c))) } }
            }
        } return f ? l : k ? j.call(l) : d ? j(l[0], c) : a
    }; var c0 = (/^(?:checkbox|radio)$/i); (function () {
        var a = eB.createElement("input"), b = eB.createElement("div"), d = eB.createDocumentFragment(); b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; d9.leadingWhitespace = b.firstChild.nodeType === 3; d9.tbody = !b.getElementsByTagName("tbody").length; d9.htmlSerialize = !!b.getElementsByTagName("link").length; d9.html5Clone = eB.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>"; a.type = "checkbox"; a.checked = true; d.appendChild(a); d9.appendChecked = a.checked; b.innerHTML = "<textarea>x</textarea>"; d9.noCloneChecked = !!b.cloneNode(true).lastChild.defaultValue; d.appendChild(b); b.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        d9.checkClone = b.cloneNode(true).cloneNode(true).lastChild.checked; d9.noCloneEvent = true; if (b.attachEvent) { b.attachEvent("onclick", function () { d9.noCloneEvent = false }); b.cloneNode(true).click() } if (d9.deleteExpando == null) { d9.deleteExpando = true; try { delete b.test } catch (c) { d9.deleteExpando = false } }
    })(); (function () { var c, a, b = eB.createElement("div"); for (c in { submit: true, change: true, focusin: true }) { a = "on" + c; if (!(d9[c + "Bubbles"] = a in eg)) { b.setAttribute(a, "t"); d9[c + "Bubbles"] = b.attributes[a].expando === false } } b = null })(); var ez = /^(?:input|select|textarea)$/i, b8 = /^key/, ds = /^(?:mouse|pointer|contextmenu)|click/, cP = /^(?:focusinfocus|focusoutblur)$/, ck = /^([^.]*)(?:\.(.+)|)$/; function er() { return true } function dh() { return false } function dx() { try { return eB.activeElement } catch (a) { } } ca.event = {
        global: {}, add: function (n, c, q, j, m) {
            var f, l, k, h, a, d, r, o, s, p, g, b = ca._data(n);
            if (!b) { return } if (q.handler) { h = q; q = h.handler; m = h.selector } if (!q.guid) { q.guid = ca.guid++ } if (!(l = b.events)) { l = b.events = {} } if (!(d = b.handle)) { d = b.handle = function (t) { return typeof ca !== dv && (!t || ca.event.triggered !== t.type) ? ca.event.dispatch.apply(d.elem, arguments) : undefined }; d.elem = n } c = (c || "").match(dT) || [""]; k = c.length; while (k--) {
                f = ck.exec(c[k]) || []; s = g = f[1]; p = (f[2] || "").split(".").sort(); if (!s) { continue } a = ca.event.special[s] || {}; s = (m ? a.delegateType : a.bindType) || s; a = ca.event.special[s] || {}; r = ca.extend({ type: s, origType: g, data: j, handler: q, guid: q.guid, selector: m, needsContext: m && ca.expr.match.needsContext.test(m), namespace: p.join(".") }, h); if (!(o = l[s])) {
                    o = l[s] = []; o.delegateCount = 0; if (!a.setup || a.setup.call(n, j, p, d) === false) {
                        if (n.addEventListener) { n.addEventListener(s, d, false) } else {
                            if (n.attachEvent) {
                                n.attachEvent("on" + s, d)
                            }
                        }
                    }
                } if (a.add) { a.add.call(n, r); if (!r.handler.guid) { r.handler.guid = q.guid } } if (m) { o.splice(o.delegateCount++, 0, r) } else { o.push(r) } ca.event.global[s] = true
            } n = null
        }, remove: function (o, c, l, n, d) {
            var j, r, f, m, k, q, a, h, s, p, g, b = ca.hasData(o) && ca._data(o); if (!b || !(q = b.events)) { return } c = (c || "").match(dT) || [""]; k = c.length; while (k--) {
                f = ck.exec(c[k]) || []; s = g = f[1]; p = (f[2] || "").split(".").sort(); if (!s) { for (s in q) { ca.event.remove(o, s + c[k], l, n, true) } continue } a = ca.event.special[s] || {}; s = (n ? a.delegateType : a.bindType) || s; h = q[s] || []; f = f[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"); m = j = h.length; while (j--) {
                    r = h[j]; if ((d || g === r.origType) && (!l || l.guid === r.guid) && (!f || f.test(r.namespace)) && (!n || n === r.selector || n === "**" && r.selector)) {
                        h.splice(j, 1); if (r.selector) { h.delegateCount-- } if (a.remove) {
                            a.remove.call(o, r)
                        }
                    }
                } if (m && !h.length) { if (!a.teardown || a.teardown.call(o, p, b.handle) === false) { ca.removeEvent(o, s, b.handle) } delete q[s] }
            } if (ca.isEmptyObject(q)) { delete b.handle; ca._removeData(o, "events") }
        }, trigger: function (m, g, o, n) {
            var f, p, a, q, c, h, j, l = [o || eB], b = dZ.call(m, "type") ? m.type : m, k = dZ.call(m, "namespace") ? m.namespace.split(".") : []; a = h = o = o || eB; if (o.nodeType === 3 || o.nodeType === 8) { return } if (cP.test(b + ca.event.triggered)) { return } if (b.indexOf(".") >= 0) { k = b.split("."); b = k.shift(); k.sort() } p = b.indexOf(":") < 0 && "on" + b; m = m[ca.expando] ? m : new ca.Event(b, typeof m === "object" && m); m.isTrigger = n ? 2 : 3; m.namespace = k.join("."); m.namespace_re = m.namespace ? new RegExp("(^|\\.)" + k.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; m.result = undefined; if (!m.target) { m.target = o } g = g == null ? [m] : ca.makeArray(g, [m]); c = ca.event.special[b] || {}; if (!n && c.trigger && c.trigger.apply(o, g) === false) {
                return
            } if (!n && !c.noBubble && !ca.isWindow(o)) { q = c.delegateType || b; if (!cP.test(q + b)) { a = a.parentNode } for (; a; a = a.parentNode) { l.push(a); h = a } if (h === (o.ownerDocument || eB)) { l.push(h.defaultView || h.parentWindow || eg) } } j = 0; while ((a = l[j++]) && !m.isPropagationStopped()) { m.type = j > 1 ? q : c.bindType || b; f = (ca._data(a, "events") || {})[m.type] && ca._data(a, "handle"); if (f) { f.apply(a, g) } f = p && a[p]; if (f && f.apply && ca.acceptData(a)) { m.result = f.apply(a, g); if (m.result === false) { m.preventDefault() } } } m.type = b; if (!n && !m.isDefaultPrevented()) { if ((!c._default || c._default.apply(l.pop(), g) === false) && ca.acceptData(o)) { if (p && o[b] && !ca.isWindow(o)) { h = o[p]; if (h) { o[p] = null } ca.event.triggered = b; try { o[b]() } catch (d) { } ca.event.triggered = undefined; if (h) { o[p] = h } } } } return m.result
        }, dispatch: function (l) {
            l = ca.event.fix(l); var k, j, a, h, f, b = [], c = dy.call(arguments), g = (ca._data(this, "events") || {})[l.type] || [], d = ca.event.special[l.type] || {};
            c[0] = l; l.delegateTarget = this; if (d.preDispatch && d.preDispatch.call(this, l) === false) { return } b = ca.event.handlers.call(this, l, g); k = 0; while ((h = b[k++]) && !l.isPropagationStopped()) { l.currentTarget = h.elem; f = 0; while ((a = h.handlers[f++]) && !l.isImmediatePropagationStopped()) { if (!l.namespace_re || l.namespace_re.test(a.namespace)) { l.handleObj = a; l.data = a.data; j = ((ca.event.special[a.origType] || {}).handle || a.handler).apply(h.elem, c); if (j !== undefined) { if ((l.result = j) === false) { l.preventDefault(); l.stopPropagation() } } } } } if (d.postDispatch) { d.postDispatch.call(this, l) } return l.result
        }, handlers: function (k, f) {
            var g, b, h, j, c = [], d = f.delegateCount, a = k.target; if (d && a.nodeType && (!k.button || k.type !== "click")) {
                for (; a != this; a = a.parentNode || this) {
                    if (a.nodeType === 1 && (a.disabled !== true || k.type !== "click")) {
                        h = []; for (j = 0; j < d; j++) {
                            b = f[j];
                            g = b.selector + " "; if (h[g] === undefined) { h[g] = b.needsContext ? ca(g, this).index(a) >= 0 : ca.find(g, this, null, [a]).length } if (h[g]) { h.push(b) }
                        } if (h.length) { c.push({ elem: a, handlers: h }) }
                    }
                }
            } if (d < f.length) { c.push({ elem: this, handlers: f.slice(d) }) } return c
        }, fix: function (f) { if (f[ca.expando]) { return f } var h, a, b, g = f.type, d = f, c = this.fixHooks[g]; if (!c) { this.fixHooks[g] = c = ds.test(g) ? this.mouseHooks : b8.test(g) ? this.keyHooks : {} } b = c.props ? this.props.concat(c.props) : this.props; f = new ca.Event(d); h = b.length; while (h--) { a = b[h]; f[a] = d[a] } if (!f.target) { f.target = d.srcElement || eB } if (f.target.nodeType === 3) { f.target = f.target.parentNode } f.metaKey = !!f.metaKey; return c.filter ? c.filter(f, d) : f }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                if (a.which == null) {
                a.which = b.charCode != null ? b.charCode : b.keyCode
                } return a
            }
        }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (g, h) { var f, d, c, a = h.button, b = h.fromElement; if (g.pageX == null && h.clientX != null) { d = g.target.ownerDocument || eB; c = d.documentElement; f = d.body; g.pageX = h.clientX + (c && c.scrollLeft || f && f.scrollLeft || 0) - (c && c.clientLeft || f && f.clientLeft || 0); g.pageY = h.clientY + (c && c.scrollTop || f && f.scrollTop || 0) - (c && c.clientTop || f && f.clientTop || 0) } if (!g.relatedTarget && b) { g.relatedTarget = b === g.target ? h.toElement : b } if (!g.which && a !== undefined) { g.which = (a & 1 ? 1 : (a & 2 ? 3 : (a & 4 ? 2 : 0))) } return g } }, special: {
            load: { noBubble: true }, focus: { trigger: function () { if (this !== dx() && this.focus) { try { this.focus(); return false } catch (a) { } } }, delegateType: "focusin" }, blur: {
                trigger: function () {
                    if (this === dx() && this.blur) {
                        this.blur();
                        return false
                    }
                }, delegateType: "focusout"
            }, click: { trigger: function () { if (ca.nodeName(this, "input") && this.type === "checkbox" && this.click) { this.click(); return false } }, _default: function (a) { return ca.nodeName(a.target, "a") } }, beforeunload: { postDispatch: function (a) { if (a.result !== undefined && a.originalEvent) { a.originalEvent.returnValue = a.result } } }
        }, simulate: function (f, c, d, a) { var b = ca.extend(new ca.Event(), d, { type: f, isSimulated: true, originalEvent: {} }); if (a) { ca.event.trigger(b, null, c) } else { ca.event.dispatch.call(c, b) } if (b.isDefaultPrevented()) { d.preventDefault() } }
    }; ca.removeEvent = eB.removeEventListener ? function (a, b, c) { if (a.removeEventListener) { a.removeEventListener(b, c, false) } } : function (d, a, c) { var b = "on" + a; if (d.detachEvent) { if (typeof d[b] === dv) { d[b] = null } d.detachEvent(b, c) } }; ca.Event = function (a, b) {
        if (!(this instanceof ca.Event)) {
            return new ca.Event(a, b)
        } if (a && a.type) { this.originalEvent = a; this.type = a.type; this.isDefaultPrevented = a.defaultPrevented || a.defaultPrevented === undefined && a.returnValue === false ? er : dh } else { this.type = a } if (b) { ca.extend(this, b) } this.timeStamp = a && a.timeStamp || ca.now(); this[ca.expando] = true
    }; ca.Event.prototype = {
        isDefaultPrevented: dh, isPropagationStopped: dh, isImmediatePropagationStopped: dh, preventDefault: function () { var a = this.originalEvent; this.isDefaultPrevented = er; if (!a) { return } if (a.preventDefault) { a.preventDefault() } else { a.returnValue = false } }, stopPropagation: function () { var a = this.originalEvent; this.isPropagationStopped = er; if (!a) { return } if (a.stopPropagation) { a.stopPropagation() } a.cancelBubble = true }, stopImmediatePropagation: function () {
            var a = this.originalEvent; this.isImmediatePropagationStopped = er; if (a && a.stopImmediatePropagation) {
                a.stopImmediatePropagation()
            } this.stopPropagation()
        }
    }; ca.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) { ca.event.special[a] = { delegateType: b, bindType: b, handle: function (f) { var h, c = this, d = f.relatedTarget, g = f.handleObj; if (!d || (d !== c && !ca.contains(c, d))) { f.type = g.origType; h = g.handler.apply(this, arguments); f.type = b } return h } } }); if (!d9.submitBubbles) {
        ca.event.special.submit = {
            setup: function () { if (ca.nodeName(this, "form")) { return false } ca.event.add(this, "click._submit keypress._submit", function (b) { var c = b.target, a = ca.nodeName(c, "input") || ca.nodeName(c, "button") ? c.form : undefined; if (a && !ca._data(a, "submitBubbles")) { ca.event.add(a, "submit._submit", function (d) { d._submit_bubble = true }); ca._data(a, "submitBubbles", true) } }) }, postDispatch: function (a) {
                if (a._submit_bubble) {
                    delete a._submit_bubble;
                    if (this.parentNode && !a.isTrigger) { ca.event.simulate("submit", this.parentNode, a, true) }
                }
            }, teardown: function () { if (ca.nodeName(this, "form")) { return false } ca.event.remove(this, "._submit") }
        }
    } if (!d9.changeBubbles) {
        ca.event.special.change = {
            setup: function () {
                if (ez.test(this.nodeName)) { if (this.type === "checkbox" || this.type === "radio") { ca.event.add(this, "propertychange._change", function (a) { if (a.originalEvent.propertyName === "checked") { this._just_changed = true } }); ca.event.add(this, "click._change", function (a) { if (this._just_changed && !a.isTrigger) { this._just_changed = false } ca.event.simulate("change", this, a, true) }) } return false } ca.event.add(this, "beforeactivate._change", function (b) {
                    var a = b.target; if (ez.test(a.nodeName) && !ca._data(a, "changeBubbles")) {
                        ca.event.add(a, "change._change", function (c) {
                            if (this.parentNode && !c.isSimulated && !c.isTrigger) {
                                ca.event.simulate("change", this.parentNode, c, true)
                            }
                        }); ca._data(a, "changeBubbles", true)
                    }
                })
            }, handle: function (a) { var b = a.target; if (this !== b || a.isSimulated || a.isTrigger || (b.type !== "radio" && b.type !== "checkbox")) { return a.handleObj.handler.apply(this, arguments) } }, teardown: function () { ca.event.remove(this, "._change"); return !ez.test(this.nodeName) }
        }
    } if (!d9.focusinBubbles) { ca.each({ focus: "focusin", blur: "focusout" }, function (c, b) { var a = function (d) { ca.event.simulate(b, d.target, ca.event.fix(d), true) }; ca.event.special[b] = { setup: function () { var d = this.ownerDocument || this, f = ca._data(d, b); if (!f) { d.addEventListener(c, a, true) } ca._data(d, b, (f || 0) + 1) }, teardown: function () { var d = this.ownerDocument || this, f = ca._data(d, b) - 1; if (!f) { d.removeEventListener(c, a, true); ca._removeData(d, b) } else { ca._data(d, b, f) } } } }) } ca.fn.extend({
        on: function (h, f, c, d, a) {
            var g, b; if (typeof h === "object") {
                if (typeof f !== "string") {
                    c = c || f;
                    f = undefined
                } for (g in h) { this.on(g, f, c, h[g], a) } return this
            } if (c == null && d == null) { d = f; c = f = undefined } else { if (d == null) { if (typeof f === "string") { d = c; c = undefined } else { d = c; c = f; f = undefined } } } if (d === false) { d = dh } else { if (!d) { return this } } if (a === 1) { b = d; d = function (j) { ca().off(j); return b.apply(this, arguments) }; d.guid = b.guid || (b.guid = ca.guid++) } return this.each(function () { ca.event.add(this, h, d, c, f) })
        }, one: function (a, b, c, d) { return this.on(a, b, c, d, 1) }, off: function (f, c, b) {
            var a, d; if (f && f.preventDefault && f.handleObj) { a = f.handleObj; ca(f.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler); return this } if (typeof f === "object") { for (d in f) { this.off(d, c, f[d]) } return this } if (c === false || typeof c === "function") { b = c; c = undefined } if (b === false) { b = dh } return this.each(function () {
                ca.event.remove(this, f, b, c)
            })
        }, trigger: function (b, a) { return this.each(function () { ca.event.trigger(b, a, this) }) }, triggerHandler: function (b, c) { var a = this[0]; if (a) { return ca.event.trigger(b, c, a, true) } }
    }); function c2(b) { var c = dw.split("|"), a = b.createDocumentFragment(); if (a.createElement) { while (c.length) { a.createElement(c.pop()) } } return a } var dw = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", cU = / jQuery\d+="(?:null|\d+)"/g, c9 = new RegExp("<(?:" + dw + ")[\\s/>]", "i"), cc = /^\s+/, c6 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ex = /<([\w:]+)/, de = /<tbody/i, eo = /<|&#?\w+;/, eF = /<(?:script|style|link)/i, ed = /checked\s*(?:[^=]|=\s*.checked.)/i, c3 = /^$|\/(?:java|ecma)script/i, cj = /^true\/(.*)/, d5 = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, cZ = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: d9.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, cd = c2(eB), eD = cd.appendChild(eB.createElement("div"));
    cZ.optgroup = cZ.option; cZ.tbody = cZ.tfoot = cZ.colgroup = cZ.caption = cZ.thead; cZ.th = cZ.td; function dq(d, b) { var g, c, f = 0, a = typeof d.getElementsByTagName !== dv ? d.getElementsByTagName(b || "*") : typeof d.querySelectorAll !== dv ? d.querySelectorAll(b || "*") : undefined; if (!a) { for (a = [], g = d.childNodes || d; (c = g[f]) != null; f++) { if (!b || ca.nodeName(c, b)) { a.push(c) } else { ca.merge(a, dq(c, b)) } } } return b === undefined || b && ca.nodeName(d, b) ? ca.merge([d], a) : a } function eA(a) { if (c0.test(a.type)) { a.defaultChecked = a.checked } } function ep(a, b) { return ca.nodeName(a, "table") && ca.nodeName(b.nodeType !== 11 ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a } function db(a) { a.type = (ca.find.attr(a, "type") !== null) + "/" + a.type; return a } function cb(a) {
        var b = cj.exec(a.type); if (b) {
        a.type = b[1]
        } else { a.removeAttribute("type") } return a
    } function cE(b, c) { var a, d = 0; for (; (a = b[d]) != null; d++) { ca._data(a, "globalEval", !c || ca._data(c[d], "globalEval")) } } function cw(g, j) { if (j.nodeType !== 1 || !ca.hasData(g)) { return } var b, d, a, c = ca._data(g), f = ca._data(j, c), h = c.events; if (h) { delete f.handle; f.events = {}; for (b in h) { for (d = 0, a = h[b].length; d < a; d++) { ca.event.add(j, b, h[b][d]) } } } if (f.data) { f.data = ca.extend({}, f.data) } } function eI(c, a) {
        var b, d, f; if (a.nodeType !== 1) { return } b = a.nodeName.toLowerCase(); if (!d9.noCloneEvent && a[ca.expando]) { f = ca._data(a); for (d in f.events) { ca.removeEvent(a, d, f.handle) } a.removeAttribute(ca.expando) } if (b === "script" && a.text !== c.text) { db(a).text = c.text; cb(a) } else {
            if (b === "object") {
                if (a.parentNode) { a.outerHTML = c.outerHTML } if (d9.html5Clone && (c.innerHTML && !ca.trim(a.innerHTML))) {
                a.innerHTML = c.innerHTML
                }
            } else { if (b === "input" && c0.test(c.type)) { a.defaultChecked = a.checked = c.checked; if (a.value !== c.value) { a.value = c.value } } else { if (b === "option") { a.defaultSelected = a.selected = c.defaultSelected } else { if (b === "input" || b === "textarea") { a.defaultValue = c.defaultValue } } } }
        }
    } ca.extend({
        clone: function (g, d, k) {
            var h, f, a, j, c, b = ca.contains(g.ownerDocument, g); if (d9.html5Clone || ca.isXMLDoc(g) || !c9.test("<" + g.nodeName + ">")) { a = g.cloneNode(true) } else { eD.innerHTML = g.outerHTML; eD.removeChild(a = eD.firstChild) } if ((!d9.noCloneEvent || !d9.noCloneChecked) && (g.nodeType === 1 || g.nodeType === 11) && !ca.isXMLDoc(g)) { h = dq(a); c = dq(g); for (j = 0; (f = c[j]) != null; ++j) { if (h[j]) { eI(f, h[j]) } } } if (d) { if (k) { c = c || dq(g); h = h || dq(a); for (j = 0; (f = c[j]) != null; j++) { cw(f, h[j]) } } else { cw(g, a) } } h = dq(a, "script"); if (h.length > 0) { cE(h, !b && dq(g, "script")) } h = c = f = null; return a
        }, buildFragment: function (n, q, g, a) {
            var f, m, h, b, p, c, l, j = n.length, o = c2(q), k = [], d = 0; for (; d < j; d++) { m = n[d]; if (m || m === 0) { if (ca.type(m) === "object") { ca.merge(k, m.nodeType ? [m] : m) } else { if (!eo.test(m)) { k.push(q.createTextNode(m)) } else { b = b || o.appendChild(q.createElement("div")); p = (ex.exec(m) || ["", ""])[1].toLowerCase(); l = cZ[p] || cZ._default; b.innerHTML = l[1] + m.replace(c6, "<$1></$2>") + l[2]; f = l[0]; while (f--) { b = b.lastChild } if (!d9.leadingWhitespace && cc.test(m)) { k.push(q.createTextNode(cc.exec(m)[0])) } if (!d9.tbody) { m = p === "table" && !de.test(m) ? b.firstChild : l[1] === "<table>" && !de.test(m) ? b : 0; f = m && m.childNodes.length; while (f--) { if (ca.nodeName((c = m.childNodes[f]), "tbody") && !c.childNodes.length) { m.removeChild(c) } } } ca.merge(k, b.childNodes); b.textContent = ""; while (b.firstChild) { b.removeChild(b.firstChild) } b = o.lastChild } } } } if (b) {
                o.removeChild(b)
            } if (!d9.appendChecked) { ca.grep(dq(k, "input"), eA) } d = 0; while ((m = k[d++])) { if (a && ca.inArray(m, a) !== -1) { continue } h = ca.contains(m.ownerDocument, m); b = dq(o.appendChild(m), "script"); if (h) { cE(b) } if (g) { f = 0; while ((m = b[f++])) { if (c3.test(m.type || "")) { g.push(m) } } } } b = null; return o
        }, cleanData: function (m, b) { var g, c, h, l, k = 0, a = ca.expando, j = ca.cache, f = d9.deleteExpando, d = ca.event.special; for (; (g = m[k]) != null; k++) { if (b || ca.acceptData(g)) { h = g[a]; l = h && j[h]; if (l) { if (l.events) { for (c in l.events) { if (d[c]) { ca.event.remove(g, c) } else { ca.removeEvent(g, c, l.handle) } } } if (j[h]) { delete j[h]; if (f) { delete g[a] } else { if (typeof g.removeAttribute !== dv) { g.removeAttribute(a) } else { g[a] = null } } dW.push(h) } } } } }
    }); ca.fn.extend({
        text: function (a) {
            return cD(this, function (b) {
                return b === undefined ? ca.text(this) : this.empty().append((this[0] && this[0].ownerDocument || eB).createTextNode(b))
            }, null, a, arguments.length)
        }, append: function () { return this.domManip(arguments, function (b) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { var a = ep(this, b); a.appendChild(b) } }) }, prepend: function () { return this.domManip(arguments, function (b) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { var a = ep(this, b); a.insertBefore(b, a.firstChild) } }) }, before: function () { return this.domManip(arguments, function (a) { if (this.parentNode) { this.parentNode.insertBefore(a, this) } }) }, after: function () { return this.domManip(arguments, function (a) { if (this.parentNode) { this.parentNode.insertBefore(a, this.nextSibling) } }) }, remove: function (c, a) {
            var b, f = c ? ca.filter(c, this) : this, d = 0; for (; (b = f[d]) != null; d++) {
                if (!a && b.nodeType === 1) { ca.cleanData(dq(b)) } if (b.parentNode) {
                    if (a && ca.contains(b.ownerDocument, b)) {
                        cE(dq(b, "script"))
                    } b.parentNode.removeChild(b)
                }
            } return this
        }, empty: function () { var b, a = 0; for (; (b = this[a]) != null; a++) { if (b.nodeType === 1) { ca.cleanData(dq(b, false)) } while (b.firstChild) { b.removeChild(b.firstChild) } if (b.options && ca.nodeName(b, "select")) { b.options.length = 0 } } return this }, clone: function (a, b) { a = a == null ? false : a; b = b == null ? a : b; return this.map(function () { return ca.clone(this, a, b) }) }, html: function (a) {
            return cD(this, function (c) {
                var d = this[0] || {}, f = 0, g = this.length; if (c === undefined) { return d.nodeType === 1 ? d.innerHTML.replace(cU, "") : undefined } if (typeof c === "string" && !eF.test(c) && (d9.htmlSerialize || !c9.test(c)) && (d9.leadingWhitespace || !cc.test(c)) && !cZ[(ex.exec(c) || ["", ""])[1].toLowerCase()]) {
                    c = c.replace(c6, "<$1></$2>"); try {
                        for (; f < g; f++) { d = this[f] || {}; if (d.nodeType === 1) { ca.cleanData(dq(d, false)); d.innerHTML = c } } d = 0
                    } catch (b) { }
                } if (d) { this.empty().append(c) }
            }, null, a, arguments.length)
        }, replaceWith: function () { var a = arguments[0]; this.domManip(arguments, function (b) { a = this.parentNode; ca.cleanData(dq(this)); if (a) { a.replaceChild(b, this) } }); return a && (a.length || a.nodeType) ? this : this.remove() }, detach: function (a) { return this.remove(a, true) }, domManip: function (g, a) {
            g = di.apply([], g); var m, l, p, o, c, h, n = 0, k = this.length, d = this, b = k - 1, f = g[0], j = ca.isFunction(f); if (j || (k > 1 && typeof f === "string" && !d9.checkClone && ed.test(f))) { return this.each(function (r) { var q = d.eq(r); if (j) { g[0] = f.call(this, r, q.html()) } q.domManip(g, a) }) } if (k) {
                h = ca.buildFragment(g, this[0].ownerDocument, false, this); m = h.firstChild; if (h.childNodes.length === 1) { h = m } if (m) {
                    o = ca.map(dq(h, "script"), db); p = o.length; for (; n < k; n++) {
                        l = h; if (n !== b) {
                            l = ca.clone(l, true, true); if (p) {
                                ca.merge(o, dq(l, "script"))
                            }
                        } a.call(this[n], l, n)
                    } if (p) { c = o[o.length - 1].ownerDocument; ca.map(o, cb); for (n = 0; n < p; n++) { l = o[n]; if (c3.test(l.type || "") && !ca._data(l, "globalEval") && ca.contains(c, l)) { if (l.src) { if (ca._evalUrl) { ca._evalUrl(l.src) } } else { ca.globalEval((l.text || l.textContent || l.innerHTML || "").replace(d5, "")) } } } } h = m = null
                }
            } return this
        }
    }); ca.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (b, a) { ca.fn[b] = function (j) { var h, f = 0, g = [], c = ca(j), d = c.length - 1; for (; f <= d; f++) { h = f === d ? this : this.clone(true); ca(c[f])[a](h); dA.apply(g, h.get()) } return this.pushStack(g) } }); var dO, dB = {}; function em(c, b) {
        var a, f = ca(b.createElement(c)).appendTo(b.body), d = eg.getDefaultComputedStyle && (a = eg.getDefaultComputedStyle(f[0])) ? a.display : ca.css(f[0], "display"); f.detach(); return d
    } function dU(c) { var a = eB, b = dB[c]; if (!b) { b = em(c, a); if (b === "none" || !b) { dO = (dO || ca("<iframe frameborder='0' width='0' height='0'/>")).appendTo(a.documentElement); a = (dO[0].contentWindow || dO[0].contentDocument).document; a.write(); a.close(); b = em(c, a); dO.detach() } dB[c] = b } return b } (function () {
        var a; d9.shrinkWrapBlocks = function () {
            if (a != null) { return a } a = false; var c, b, d; b = eB.getElementsByTagName("body")[0]; if (!b || !b.style) { return } c = eB.createElement("div"); d = eB.createElement("div"); d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"; b.appendChild(d).appendChild(c); if (typeof c.style.zoom !== dv) {
                c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"; c.appendChild(eB.createElement("div")).style.width = "5px";
                a = c.offsetWidth !== 3
            } b.removeChild(d); return a
        }
    })(); var eb = (/^margin/); var dH = new RegExp("^(" + cz + ")(?!px)[a-z%]+$", "i"); var cT, dn, ev = /^(top|right|bottom|left)$/; if (eg.getComputedStyle) { cT = function (a) { if (a.ownerDocument.defaultView.opener) { return a.ownerDocument.defaultView.getComputedStyle(a, null) } return eg.getComputedStyle(a, null) }; dn = function (g, d, f) { var c, h, b, a, j = g.style; f = f || cT(g); a = f ? f.getPropertyValue(d) || f[d] : undefined; if (f) { if (a === "" && !ca.contains(g.ownerDocument, g)) { a = ca.style(g, d) } if (dH.test(a) && eb.test(d)) { c = j.width; h = j.minWidth; b = j.maxWidth; j.minWidth = j.maxWidth = j.width = a; a = f.width; j.width = c; j.minWidth = h; j.maxWidth = b } } return a === undefined ? a : a + "" } } else {
        if (eB.documentElement.currentStyle) {
            cT = function (a) { return a.currentStyle }; dn = function (g, h, b) {
                var f, d, c, j, a = g.style; b = b || cT(g); j = b ? b[h] : undefined;
                if (j == null && a && a[h]) { j = a[h] } if (dH.test(j) && !ev.test(h)) { f = a.left; d = g.runtimeStyle; c = d && d.left; if (c) { d.left = g.currentStyle.left } a.left = h === "fontSize" ? "1em" : j; j = a.pixelLeft + "px"; a.left = f; if (c) { d.left = c } } return j === undefined ? j : j + "" || "auto"
            }
        }
    } function dj(b, a) { return { get: function () { var c = b(); if (c == null) { return } if (c) { delete this.get; return } return (this.get = a).apply(this, arguments) } } } (function () {
        var g, b, h, f, j, d, c; g = eB.createElement("div"); g.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; h = g.getElementsByTagName("a")[0]; b = h && h.style; if (!b) { return } b.cssText = "float:left;opacity:.5"; d9.opacity = b.opacity === "0.5"; d9.cssFloat = !!b.cssFloat; g.style.backgroundClip = "content-box"; g.cloneNode(true).style.backgroundClip = ""; d9.clearCloneStyle = g.style.backgroundClip === "content-box";
        d9.boxSizing = b.boxSizing === "" || b.MozBoxSizing === "" || b.WebkitBoxSizing === ""; ca.extend(d9, { reliableHiddenOffsets: function () { if (d == null) { a() } return d }, boxSizingReliable: function () { if (j == null) { a() } return j }, pixelPosition: function () { if (f == null) { a() } return f }, reliableMarginRight: function () { if (c == null) { a() } return c } }); function a() {
            var n, m, l, k; m = eB.getElementsByTagName("body")[0]; if (!m || !m.style) { return } n = eB.createElement("div"); l = eB.createElement("div"); l.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"; m.appendChild(l).appendChild(n); n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"; f = j = false; c = true; if (eg.getComputedStyle) {
                f = (eg.getComputedStyle(n, null) || {}).top !== "1%";
                j = (eg.getComputedStyle(n, null) || { width: "4px" }).width === "4px"; k = n.appendChild(eB.createElement("div")); k.style.cssText = n.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"; k.style.marginRight = k.style.width = "0"; n.style.width = "1px"; c = !parseFloat((eg.getComputedStyle(k, null) || {}).marginRight); n.removeChild(k)
            } n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"; k = n.getElementsByTagName("td"); k[0].style.cssText = "margin:0;border:0;padding:0;display:none"; d = k[0].offsetHeight === 0; if (d) { k[0].style.display = ""; k[1].style.display = "none"; d = k[0].offsetHeight === 0 } m.removeChild(l)
        }
    })(); ca.swap = function (f, c, b, g) {
        var h, a, d = {}; for (a in c) { d[a] = f.style[a]; f.style[a] = c[a] } h = b.apply(f, g || []); for (a in c) { f.style[a] = d[a] } return h
    }; var dI = /alpha\([^)]*\)/i, et = /opacity\s*=\s*([^)]*)/, eE = /^(none|table(?!-c[ea]).+)/, ec = new RegExp("^(" + cz + ")(.*)$", "i"), cY = new RegExp("^([+-])=(" + cz + ")", "i"), cI = { position: "absolute", visibility: "hidden", display: "block" }, cL = { letterSpacing: "0", fontWeight: "400" }, dS = ["Webkit", "O", "Moz", "ms"]; function dY(c, f) { if (f in c) { return f } var a = f.charAt(0).toUpperCase() + f.slice(1), b = f, d = dS.length; while (d--) { f = dS[d] + a; if (f in c) { return f } } return b } function b5(g, f) {
        var d, a, b, c = [], j = 0, h = g.length; for (; j < h; j++) { a = g[j]; if (!a.style) { continue } c[j] = ca._data(a, "olddisplay"); d = a.style.display; if (f) { if (!c[j] && d === "none") { a.style.display = "" } if (a.style.display === "" && dL(a)) { c[j] = ca._data(a, "olddisplay", dU(a.nodeName)) } } else { b = dL(a); if (d && d !== "none" || !b) { ca._data(a, "olddisplay", b ? d : ca.css(a, "display")) } } } for (j = 0; j < h; j++) {
            a = g[j];
            if (!a.style) { continue } if (!f || a.style.display === "none" || a.style.display === "") { a.style.display = f ? c[j] || "" : "none" }
        } return g
    } function ea(b, d, c) { var a = ec.exec(d); return a ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : d } function dE(f, h, c, a, d) { var g = c === (a ? "border" : "content") ? 4 : h === "width" ? 1 : 0, b = 0; for (; g < 4; g += 2) { if (c === "margin") { b += ca.css(f, c + dD[g], true, d) } if (a) { if (c === "content") { b -= ca.css(f, "padding" + dD[g], true, d) } if (c !== "margin") { b -= ca.css(f, "border" + dD[g] + "Width", true, d) } } else { b += ca.css(f, "padding" + dD[g], true, d); if (c !== "padding") { b += ca.css(f, "border" + dD[g] + "Width", true, d) } } } return b } function cm(f, a, d) {
        var g = true, c = a === "width" ? f.offsetWidth : f.offsetHeight, h = cT(f), b = d9.boxSizing && ca.css(f, "boxSizing", false, h) === "border-box"; if (c <= 0 || c == null) {
            c = dn(f, a, h); if (c < 0 || c == null) { c = f.style[a] } if (dH.test(c)) {
                return c
            } g = b && (d9.boxSizingReliable() || c === f.style[a]); c = parseFloat(c) || 0
        } return (c + dE(f, a, d || (b ? "border" : "content"), g, h)) + "px"
    } ca.extend({
        cssHooks: { opacity: { get: function (c, a) { if (a) { var b = dn(c, "opacity"); return b === "" ? "1" : b } } } }, cssNumber: { columnCount: true, fillOpacity: true, flexGrow: true, flexShrink: true, fontWeight: true, lineHeight: true, opacity: true, order: true, orphans: true, widows: true, zIndex: true, zoom: true }, cssProps: { "float": d9.cssFloat ? "cssFloat" : "styleFloat" }, style: function (h, l, b, g) {
            if (!h || h.nodeType === 3 || h.nodeType === 8 || !h.style) { return } var d, c, a, f = ca.camelCase(l), k = h.style; l = ca.cssProps[f] || (ca.cssProps[f] = dY(k, f)); a = ca.cssHooks[l] || ca.cssHooks[f]; if (b !== undefined) {
                c = typeof b; if (c === "string" && (d = cY.exec(b))) { b = (d[1] + 1) * d[2] + parseFloat(ca.css(h, l)); c = "number" } if (b == null || b !== b) { return } if (c === "number" && !ca.cssNumber[f]) {
                    b += "px"
                } if (!d9.clearCloneStyle && b === "" && l.indexOf("background") === 0) { k[l] = "inherit" } if (!a || !("set" in a) || (b = a.set(h, b, g)) !== undefined) { try { k[l] = b } catch (j) { } }
            } else { if (a && "get" in a && (d = a.get(h, false, g)) !== undefined) { return d } return k[l] }
        }, css: function (g, f, c, b) { var h, d, a, j = ca.camelCase(f); f = ca.cssProps[j] || (ca.cssProps[j] = dY(g.style, j)); a = ca.cssHooks[f] || ca.cssHooks[j]; if (a && "get" in a) { d = a.get(g, true, c) } if (d === undefined) { d = dn(g, f, b) } if (d === "normal" && f in cL) { d = cL[f] } if (c === "" || c) { h = parseFloat(d); return c === true || ca.isNumeric(h) ? h || 0 : d } return d }
    }); ca.each(["height", "width"], function (b, a) {
    ca.cssHooks[a] = {
        get: function (d, f, c) { if (f) { return eE.test(ca.css(d, "display")) && d.offsetWidth === 0 ? ca.swap(d, cI, function () { return cm(d, a, c) }) : cm(d, a, c) } }, set: function (f, d, c) {
            var g = c && cT(f); return ea(f, d, c ? dE(f, a, c, d9.boxSizing && ca.css(f, "boxSizing", false, g) === "border-box", g) : 0)
        }
    }
    }); if (!d9.opacity) { ca.cssHooks.opacity = { get: function (a, b) { return et.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : b ? "1" : "" }, set: function (d, c) { var f = d.style, a = d.currentStyle, b = ca.isNumeric(c) ? "alpha(opacity=" + c * 100 + ")" : "", g = a && a.filter || f.filter || ""; f.zoom = 1; if ((c >= 1 || c === "") && ca.trim(g.replace(dI, "")) === "" && f.removeAttribute) { f.removeAttribute("filter"); if (c === "" || a && !a.filter) { return } } f.filter = dI.test(g) ? g.replace(dI, b) : g + " " + b } } } ca.cssHooks.marginRight = dj(d9.reliableMarginRight, function (a, b) { if (b) { return ca.swap(a, { display: "inline-block" }, dn, [a, "marginRight"]) } }); ca.each({ margin: "", padding: "", border: "Width" }, function (b, a) {
    ca.cssHooks[b + a] = {
        expand: function (d) {
            var f = 0, g = {}, c = typeof d === "string" ? d.split(" ") : [d]; for (; f < 4; f++) {
            g[b + dD[f] + a] = c[f] || c[f - 2] || c[0]
            } return g
        }
    }; if (!eb.test(b)) { ca.cssHooks[b + a].set = ea }
    }); ca.fn.extend({ css: function (b, a) { return cD(this, function (f, j, d) { var g, k, c = {}, h = 0; if (ca.isArray(j)) { g = cT(f); k = j.length; for (; h < k; h++) { c[j[h]] = ca.css(f, j[h], false, g) } return c } return d !== undefined ? ca.style(f, j, d) : ca.css(f, j) }, b, a, arguments.length > 1) }, show: function () { return b5(this, true) }, hide: function () { return b5(this) }, toggle: function (a) { if (typeof a === "boolean") { return a ? this.show() : this.hide() } return this.each(function () { if (dL(this)) { ca(this).show() } else { ca(this).hide() } }) } }); function dm(f, a, c, b, d) { return new dm.prototype.init(f, a, c, b, d) } ca.Tween = dm; dm.prototype = {
        constructor: dm, init: function (f, a, d, c, b, g) {
        this.elem = f; this.prop = d; this.easing = b || "swing"; this.options = a; this.start = this.now = this.cur(); this.end = c; this.unit = g || (ca.cssNumber[d] ? "" : "px")
        }, cur: function () { var a = dm.propHooks[this.prop]; return a && a.get ? a.get(this) : dm.propHooks._default.get(this) }, run: function (c) { var a, b = dm.propHooks[this.prop]; if (this.options.duration) { this.pos = a = ca.easing[this.easing](c, this.options.duration * c, 0, 1, this.options.duration) } else { this.pos = a = c } this.now = (this.end - this.start) * a + this.start; if (this.options.step) { this.options.step.call(this.elem, this.now, this) } if (b && b.set) { b.set(this) } else { dm.propHooks._default.set(this) } return this }
    }; dm.prototype.init.prototype = dm.prototype; dm.propHooks = {
        _default: {
            get: function (a) { var b; if (a.elem[a.prop] != null && (!a.elem.style || a.elem.style[a.prop] == null)) { return a.elem[a.prop] } b = ca.css(a.elem, a.prop, ""); return !b || b === "auto" ? 0 : b }, set: function (a) {
                if (ca.fx.step[a.prop]) { ca.fx.step[a.prop](a) } else {
                    if (a.elem.style && (a.elem.style[ca.cssProps[a.prop]] != null || ca.cssHooks[a.prop])) {
                        ca.style(a.elem, a.prop, a.now + a.unit)
                    } else { a.elem[a.prop] = a.now }
                }
            }
        }
    }; dm.propHooks.scrollTop = dm.propHooks.scrollLeft = { set: function (a) { if (a.elem.nodeType && a.elem.parentNode) { a.elem[a.prop] = a.now } } }; ca.easing = { linear: function (a) { return a }, swing: function (a) { return 0.5 - Math.cos(a * Math.PI) / 2 } }; ca.fx = dm.prototype.init; ca.fx.step = {}; var cQ, cJ, cp = /^(?:toggle|show|hide)$/, a8 = new RegExp("^(?:([+-])=|)(" + cz + ")([a-z%]*)$", "i"), eh = /queueHooks$/, eJ = [cN], ey = { "*": [function (k, c) { var a = this.createTween(k, c), d = a.cur(), f = a8.exec(c), b = f && f[3] || (ca.cssNumber[k] ? "" : "px"), h = (ca.cssNumber[k] || b !== "px" && +d) && a8.exec(ca.css(a.elem, k)), g = 1, j = 20; if (h && h[3] !== b) { b = b || h[3]; f = f || []; h = +d || 1; do { g = g || ".5"; h = h / g; ca.style(a.elem, k, h + b) } while (g !== (g = a.cur() / d) && g !== 1 && --j) } if (f) { h = a.start = +h || +d || 0; a.unit = b; a.end = f[1] ? h + (f[1] + 1) * f[2] : +f[2] } return a }] }; function cy() {
        setTimeout(function () {
            cQ = undefined
        }); return (cQ = ca.now())
    } function ej(d, a) { var c, b = { height: d }, f = 0; a = a ? 1 : 0; for (; f < 4; f += 2 - a) { c = dD[f]; b["margin" + c] = b["padding" + c] = d } if (a) { b.opacity = b.width = d } return b } function dM(f, b, g) { var a, c = (ey[b] || []).concat(ey["*"]), d = 0, h = c.length; for (; d < h; d++) { if ((a = c[d].call(g, b, f))) { return a } } } function cN(o, d, j) {
        var q, a, m, l, k, r, f, b, n = this, c = {}, h = o.style, g = o.nodeType && dL(o), p = ca._data(o, "fxshow"); if (!j.queue) { k = ca._queueHooks(o, "fx"); if (k.unqueued == null) { k.unqueued = 0; r = k.empty.fire; k.empty.fire = function () { if (!k.unqueued) { r() } } } k.unqueued++; n.always(function () { n.always(function () { k.unqueued--; if (!ca.queue(o, "fx").length) { k.empty.fire() } }) }) } if (o.nodeType === 1 && ("height" in d || "width" in d)) {
        j.overflow = [h.overflow, h.overflowX, h.overflowY]; f = ca.css(o, "display"); b = f === "none" ? ca._data(o, "olddisplay") || dU(o.nodeName) : f;
            if (b === "inline" && ca.css(o, "float") === "none") { if (!d9.inlineBlockNeedsLayout || dU(o.nodeName) === "inline") { h.display = "inline-block" } else { h.zoom = 1 } }
        } if (j.overflow) { h.overflow = "hidden"; if (!d9.shrinkWrapBlocks()) { n.always(function () { h.overflow = j.overflow[0]; h.overflowX = j.overflow[1]; h.overflowY = j.overflow[2] }) } } for (q in d) { a = d[q]; if (cp.exec(a)) { delete d[q]; m = m || a === "toggle"; if (a === (g ? "hide" : "show")) { if (a === "show" && p && p[q] !== undefined) { g = true } else { continue } } c[q] = p && p[q] || ca.style(o, q) } else { f = undefined } } if (!ca.isEmptyObject(c)) {
            if (p) { if ("hidden" in p) { g = p.hidden } } else { p = ca._data(o, "fxshow", {}) } if (m) { p.hidden = !g } if (g) { ca(o).show() } else { n.done(function () { ca(o).hide() }) } n.done(function () { var s; ca._removeData(o, "fxshow"); for (s in c) { ca.style(o, s, c[s]) } }); for (q in c) {
                l = dM(g ? p[q] : 0, q, n); if (!(q in p)) {
                p[q] = l.start;
                    if (g) { l.end = l.start; l.start = q === "width" || q === "height" ? 1 : 0 }
                }
            }
        } else { if ((f === "none" ? dU(o.nodeName) : f) === "inline") { h.display = f } }
    } function eu(g, f) { var h, a, c, b, d; for (h in g) { a = ca.camelCase(h); c = f[a]; b = g[h]; if (ca.isArray(b)) { c = b[1]; b = g[h] = b[0] } if (h !== a) { g[a] = b; delete g[h] } d = ca.cssHooks[a]; if (d && "expand" in d) { b = d.expand(b); delete g[a]; for (h in b) { if (!(h in g)) { g[h] = b[h]; f[h] = c } } } else { f[a] = c } } } function dr(j, h, b) {
        var a, m, l = 0, k = eJ.length, c = ca.Deferred().always(function () { delete g.elem }), g = function () { if (m) { return false } var n = cQ || cy(), q = Math.max(0, f.startTime + f.duration - n), s = q / f.duration || 0, o = 1 - s, r = 0, p = f.tweens.length; for (; r < p; r++) { f.tweens[r].run(o) } c.notifyWith(j, [f, o, q]); if (o < 1 && p) { return q } else { c.resolveWith(j, [f]); return false } }, f = c.promise({
            elem: j, props: ca.extend({}, h), opts: ca.extend(true, { specialEasing: {} }, b), originalProperties: h, originalOptions: b, startTime: cQ || cy(), duration: b.duration, tweens: [], createTween: function (n, p) {
                var o = ca.Tween(j, f.opts, n, p, f.opts.specialEasing[n] || f.opts.easing);
                f.tweens.push(o); return o
            }, stop: function (o) { var p = 0, n = o ? f.tweens.length : 0; if (m) { return this } m = true; for (; p < n; p++) { f.tweens[p].run(1) } if (o) { c.resolveWith(j, [f, o]) } else { c.rejectWith(j, [f, o]) } return this }
        }), d = f.props; eu(d, f.opts.specialEasing); for (; l < k; l++) { a = eJ[l].call(f, j, d, f.opts); if (a) { return a } } ca.map(d, dM, f); if (ca.isFunction(f.opts.start)) { f.opts.start.call(j, f) } ca.fx.timer(ca.extend(g, { elem: j, anim: f, queue: f.opts.queue })); return f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    } ca.Animation = ca.extend(dr, { tweener: function (a, c) { if (ca.isFunction(a)) { c = a; a = ["*"] } else { a = a.split(" ") } var d, b = 0, f = a.length; for (; b < f; b++) { d = a[b]; ey[d] = ey[d] || []; ey[d].unshift(c) } }, prefilter: function (a, b) { if (b) { eJ.unshift(a) } else { eJ.push(a) } } }); ca.speed = function (d, c, a) {
        var b = d && typeof d === "object" ? ca.extend({}, d) : { complete: a || !a && c || ca.isFunction(d) && d, duration: d, easing: a && c || c && !ca.isFunction(c) && c };
        b.duration = ca.fx.off ? 0 : typeof b.duration === "number" ? b.duration : b.duration in ca.fx.speeds ? ca.fx.speeds[b.duration] : ca.fx.speeds._default; if (b.queue == null || b.queue === true) { b.queue = "fx" } b.old = b.complete; b.complete = function () { if (ca.isFunction(b.old)) { b.old.call(this) } if (b.queue) { ca.dequeue(this, b.queue) } }; return b
    }; ca.fn.extend({
        fadeTo: function (b, c, d, a) { return this.filter(dL).css("opacity", 0).show().end().animate({ opacity: c }, b, d, a) }, animate: function (f, g, c, b) { var h = ca.isEmptyObject(f), d = ca.speed(g, c, b), a = function () { var j = dr(this, ca.extend({}, f), d); if (h || ca._data(this, "finish")) { j.stop(true) } }; a.finish = a; return h || d.queue === false ? this.each(a) : this.queue(d.queue, a) }, stop: function (d, a, b) {
            var c = function (g) { var f = g.stop; delete g.stop; f(b) }; if (typeof d !== "string") { b = a; a = d; d = undefined } if (a && d !== false) {
                this.queue(d || "fx", [])
            } return this.each(function () { var f = true, j = d != null && d + "queueHooks", g = ca.timers, h = ca._data(this); if (j) { if (h[j] && h[j].stop) { c(h[j]) } } else { for (j in h) { if (h[j] && h[j].stop && eh.test(j)) { c(h[j]) } } } for (j = g.length; j--;) { if (g[j].elem === this && (d == null || g[j].queue === d)) { g[j].anim.stop(b); f = false; g.splice(j, 1) } } if (f || !b) { ca.dequeue(this, d) } })
        }, finish: function (a) { if (a !== false) { a = a || "fx" } return this.each(function () { var g, c = ca._data(this), h = c[a + "queue"], b = c[a + "queueHooks"], d = ca.timers, f = h ? h.length : 0; c.finish = true; ca.queue(this, a, []); if (b && b.stop) { b.stop.call(this, true) } for (g = d.length; g--;) { if (d[g].elem === this && d[g].queue === a) { d[g].anim.stop(true); d.splice(g, 1) } } for (g = 0; g < f; g++) { if (h[g] && h[g].finish) { h[g].finish.call(this) } } delete c.finish }) }
    }); ca.each(["toggle", "show", "hide"], function (c, a) {
        var b = ca.fn[a]; ca.fn[a] = function (d, f, g) {
            return d == null || typeof d === "boolean" ? b.apply(this, arguments) : this.animate(ej(a, true), d, f, g)
        }
    }); ca.each({ slideDown: ej("show"), slideUp: ej("hide"), slideToggle: ej("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (b, a) { ca.fn[b] = function (f, c, d) { return this.animate(a, f, c, d) } }); ca.timers = []; ca.fx.tick = function () { var b, c = ca.timers, a = 0; cQ = ca.now(); for (; a < c.length; a++) { b = c[a]; if (!b() && c[a] === b) { c.splice(a--, 1) } } if (!c.length) { ca.fx.stop() } cQ = undefined }; ca.fx.timer = function (a) { ca.timers.push(a); if (a()) { ca.fx.start() } else { ca.timers.pop() } }; ca.fx.interval = 13; ca.fx.start = function () { if (!cJ) { cJ = setInterval(ca.fx.tick, ca.fx.interval) } }; ca.fx.stop = function () { clearInterval(cJ); cJ = null }; ca.fx.speeds = { slow: 600, fast: 200, _default: 400 }; ca.fn.delay = function (a, b) {
        a = ca.fx ? ca.fx.speeds[a] || a : a; b = b || "fx"; return this.queue(b, function (d, f) {
            var c = setTimeout(d, a); f.stop = function () {
                clearTimeout(c)
            }
        })
    }; (function () { var f, c, b, a, d; c = eB.createElement("div"); c.setAttribute("className", "t"); c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; a = c.getElementsByTagName("a")[0]; b = eB.createElement("select"); d = b.appendChild(eB.createElement("option")); f = c.getElementsByTagName("input")[0]; a.style.cssText = "top:1px"; d9.getSetAttribute = c.className !== "t"; d9.style = /top/.test(a.getAttribute("style")); d9.hrefNormalized = a.getAttribute("href") === "/a"; d9.checkOn = !!f.value; d9.optSelected = d.selected; d9.enctype = !!eB.createElement("form").enctype; b.disabled = true; d9.optDisabled = !d.disabled; f = eB.createElement("input"); f.setAttribute("value", ""); d9.input = f.getAttribute("value") === ""; f.value = "t"; f.setAttribute("type", "radio"); d9.radioValue = f.value === "t" })(); var cA = /\r/g; ca.fn.extend({
        val: function (d) {
            var c, a, b, f = this[0];
            if (!arguments.length) { if (f) { c = ca.valHooks[f.type] || ca.valHooks[f.nodeName.toLowerCase()]; if (c && "get" in c && (a = c.get(f, "value")) !== undefined) { return a } a = f.value; return typeof a === "string" ? a.replace(cA, "") : a == null ? "" : a } return } b = ca.isFunction(d); return this.each(function (h) { var g; if (this.nodeType !== 1) { return } if (b) { g = d.call(this, h, ca(this).val()) } else { g = d } if (g == null) { g = "" } else { if (typeof g === "number") { g += "" } else { if (ca.isArray(g)) { g = ca.map(g, function (j) { return j == null ? "" : j + "" }) } } } c = ca.valHooks[this.type] || ca.valHooks[this.nodeName.toLowerCase()]; if (!c || !("set" in c) || c.set(this, g, "value") === undefined) { this.value = g } })
        }
    }); ca.extend({
        valHooks: {
            option: { get: function (b) { var a = ca.find.attr(b, "value"); return a != null ? a : ca.trim(ca.text(b)) } }, select: {
                get: function (k) {
                    var g, f, a = k.options, j = k.selectedIndex, d = k.type === "select-one" || j < 0, b = d ? null : [], h = d ? j + 1 : a.length, c = j < 0 ? h : d ? j : 0;
                    for (; c < h; c++) { f = a[c]; if ((f.selected || c === j) && (d9.optDisabled ? !f.disabled : f.getAttribute("disabled") === null) && (!f.parentNode.disabled || !ca.nodeName(f.parentNode, "optgroup"))) { g = ca(f).val(); if (d) { return g } b.push(g) } } return b
                }, set: function (g, f) { var d, b, h = g.options, c = ca.makeArray(f), a = h.length; while (a--) { b = h[a]; if (ca.inArray(ca.valHooks.option.get(b), c) >= 0) { try { b.selected = d = true } catch (j) { b.scrollHeight } } else { b.selected = false } } if (!d) { g.selectedIndex = -1 } return h }
            }
        }
    }); ca.each(["radio", "checkbox"], function () { ca.valHooks[this] = { set: function (b, a) { if (ca.isArray(a)) { return (b.checked = ca.inArray(ca(b).val(), a) >= 0) } } }; if (!d9.checkOn) { ca.valHooks[this].get = function (a) { return a.getAttribute("value") === null ? "on" : a.value } } }); var cV, cq, eG = ca.expr.attrHandle, df = /^(?:checked|selected)$/i, ew = d9.getSetAttribute, dk = d9.input;
    ca.fn.extend({ attr: function (b, a) { return cD(this, ca.attr, b, a, arguments.length > 1) }, removeAttr: function (a) { return this.each(function () { ca.removeAttr(this, a) }) } }); ca.extend({
        attr: function (d, f, c) { var b, g, a = d.nodeType; if (!d || a === 3 || a === 8 || a === 2) { return } if (typeof d.getAttribute === dv) { return ca.prop(d, f, c) } if (a !== 1 || !ca.isXMLDoc(d)) { f = f.toLowerCase(); b = ca.attrHooks[f] || (ca.expr.match.bool.test(f) ? cq : cV) } if (c !== undefined) { if (c === null) { ca.removeAttr(d, f) } else { if (b && "set" in b && (g = b.set(d, c, f)) !== undefined) { return g } else { d.setAttribute(f, c + ""); return c } } } else { if (b && "get" in b && (g = b.get(d, f)) !== null) { return g } else { g = ca.find.attr(d, f); return g == null ? undefined : g } } }, removeAttr: function (f, d) {
            var c, b, g = 0, a = d && d.match(dT); if (a && f.nodeType === 1) {
                while ((c = a[g++])) {
                    b = ca.propFix[c] || c; if (ca.expr.match.bool.test(c)) {
                        if (dk && ew || !df.test(c)) {
                        f[b] = false
                        } else { f[ca.camelCase("default-" + c)] = f[b] = false }
                    } else { ca.attr(f, c, "") } f.removeAttribute(ew ? c : b)
                }
            }
        }, attrHooks: { type: { set: function (b, a) { if (!d9.radioValue && a === "radio" && ca.nodeName(b, "input")) { var c = b.value; b.setAttribute("type", a); if (c) { b.value = c } return a } } } }
    }); cq = { set: function (a, c, b) { if (c === false) { ca.removeAttr(a, b) } else { if (dk && ew || !df.test(b)) { a.setAttribute(!ew && ca.propFix[b] || b, b) } else { a[ca.camelCase("default-" + b)] = a[b] = true } } return b } }; ca.each(ca.expr.match.bool.source.match(/\w+/g), function (b, c) { var a = eG[c] || ca.find.attr; eG[c] = dk && ew || !df.test(c) ? function (h, j, d) { var f, g; if (!d) { g = eG[j]; eG[j] = f; f = a(h, j, d) != null ? j.toLowerCase() : null; eG[j] = g } return f } : function (g, d, f) { if (!f) { return g[ca.camelCase("default-" + d)] ? d.toLowerCase() : null } } }); if (!dk || !ew) {
        ca.attrHooks.value = {
            set: function (a, c, b) {
                if (ca.nodeName(a, "input")) {
                a.defaultValue = c
                } else { return cV && cV.set(a, c, b) }
            }
        }
    } if (!ew) { cV = { set: function (d, c, a) { var b = d.getAttributeNode(a); if (!b) { d.setAttributeNode((b = d.ownerDocument.createAttribute(a))) } b.value = c += ""; if (a === "value" || c === d.getAttribute(a)) { return c } } }; eG.id = eG.name = eG.coords = function (d, a, c) { var b; if (!c) { return (b = d.getAttributeNode(a)) && b.value !== "" ? b.value : null } }; ca.valHooks.button = { get: function (c, a) { var b = c.getAttributeNode(a); if (b && b.specified) { return b.value } }, set: cV.set }; ca.attrHooks.contenteditable = { set: function (a, c, b) { cV.set(a, c === "" ? false : c, b) } }; ca.each(["width", "height"], function (b, a) { ca.attrHooks[a] = { set: function (c, d) { if (d === "") { c.setAttribute(a, "auto"); return d } } } }) } if (!d9.style) { ca.attrHooks.style = { get: function (a) { return a.style.cssText || undefined }, set: function (b, a) { return (b.style.cssText = a + "") } } } var cs = /^(?:input|select|textarea|button|object)$/i, dK = /^(?:a|area)$/i;
    ca.fn.extend({ prop: function (b, a) { return cD(this, ca.prop, b, a, arguments.length > 1) }, removeProp: function (a) { a = ca.propFix[a] || a; return this.each(function () { try { this[a] = undefined; delete this[a] } catch (b) { } }) } }); ca.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function (f, g, c) { var h, b, d, a = f.nodeType; if (!f || a === 3 || a === 8 || a === 2) { return } d = a !== 1 || !ca.isXMLDoc(f); if (d) { g = ca.propFix[g] || g; b = ca.propHooks[g] } if (c !== undefined) { return b && "set" in b && (h = b.set(f, c, g)) !== undefined ? h : (f[g] = c) } else { return b && "get" in b && (h = b.get(f, g)) !== null ? h : f[g] } }, propHooks: { tabIndex: { get: function (a) { var b = ca.find.attr(a, "tabindex"); return b ? parseInt(b, 10) : cs.test(a.nodeName) || dK.test(a.nodeName) && a.href ? 0 : -1 } } } }); if (!d9.hrefNormalized) {
        ca.each(["href", "src"], function (b, a) {
        ca.propHooks[a] = {
            get: function (c) {
                return c.getAttribute(a, 4)
            }
        }
        })
    } if (!d9.optSelected) { ca.propHooks.selected = { get: function (a) { var b = a.parentNode; if (b) { b.selectedIndex; if (b.parentNode) { b.parentNode.selectedIndex } } return null } } } ca.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { ca.propFix[this.toLowerCase()] = this }); if (!d9.enctype) { ca.propFix.enctype = "encoding" } var d0 = /[\t\r\n\f]/g; ca.fn.extend({
        addClass: function (b) {
            var g, h, a, d, f, l, k = 0, j = this.length, c = typeof b === "string" && b; if (ca.isFunction(b)) { return this.each(function (m) { ca(this).addClass(b.call(this, m, this.className)) }) } if (c) {
                g = (b || "").match(dT) || []; for (; k < j; k++) {
                    h = this[k]; a = h.nodeType === 1 && (h.className ? (" " + h.className + " ").replace(d0, " ") : " "); if (a) {
                        f = 0; while ((d = g[f++])) { if (a.indexOf(" " + d + " ") < 0) { a += d + " " } } l = ca.trim(a);
                        if (h.className !== l) { h.className = l }
                    }
                }
            } return this
        }, removeClass: function (b) { var g, h, a, d, f, l, k = 0, j = this.length, c = arguments.length === 0 || typeof b === "string" && b; if (ca.isFunction(b)) { return this.each(function (m) { ca(this).removeClass(b.call(this, m, this.className)) }) } if (c) { g = (b || "").match(dT) || []; for (; k < j; k++) { h = this[k]; a = h.nodeType === 1 && (h.className ? (" " + h.className + " ").replace(d0, " ") : ""); if (a) { f = 0; while ((d = g[f++])) { while (a.indexOf(" " + d + " ") >= 0) { a = a.replace(" " + d + " ", " ") } } l = b ? ca.trim(a) : ""; if (h.className !== l) { h.className = l } } } } return this }, toggleClass: function (c, b) {
            var a = typeof c; if (typeof b === "boolean" && a === "string") { return b ? this.addClass(c) : this.removeClass(c) } if (ca.isFunction(c)) { return this.each(function (d) { ca(this).toggleClass(c.call(this, d, this.className, b), b) }) } return this.each(function () {
                if (a === "string") {
                    var f, g = 0, h = ca(this), d = c.match(dT) || [];
                    while ((f = d[g++])) { if (h.hasClass(f)) { h.removeClass(f) } else { h.addClass(f) } }
                } else { if (a === dv || a === "boolean") { if (this.className) { ca._data(this, "__className__", this.className) } this.className = this.className || c === false ? "" : ca._data(this, "__className__") || "" } }
            })
        }, hasClass: function (b) { var a = " " + b + " ", c = 0, d = this.length; for (; c < d; c++) { if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(d0, " ").indexOf(a) >= 0) { return true } } return false }
    }); ca.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function (b, a) { ca.fn[a] = function (d, c) { return arguments.length > 0 ? this.on(a, null, d, c) : this.trigger(a) } }); ca.fn.extend({
        hover: function (b, a) {
            return this.mouseenter(b).mouseleave(a || b)
        }, bind: function (b, c, a) { return this.on(b, null, c, a) }, unbind: function (b, a) { return this.off(b, null, a) }, delegate: function (b, a, c, d) { return this.on(a, b, c, d) }, undelegate: function (b, a, c) { return arguments.length === 1 ? this.off(b, "**") : this.off(a, b || "**", c) }
    }); var ef = ca.now(); var a7 = (/\?/); var eC = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g; ca.parseJSON = function (b) { if (eg.JSON && eg.JSON.parse) { return eg.JSON.parse(b + "") } var c, d = null, a = ca.trim(b + ""); return a && !ca.trim(a.replace(eC, function (g, j, h, f) { if (c && j) { d = 0 } if (d === 0) { return g } c = h || j; d += !f - !h; return "" })) ? (Function("return " + a))() : ca.error("Invalid JSON: " + b) }; ca.parseXML = function (c) {
        var a, d; if (!c || typeof c !== "string") { return null } try {
            if (eg.DOMParser) {
                d = new DOMParser();
                a = d.parseFromString(c, "text/xml")
            } else { a = new ActiveXObject("Microsoft.XMLDOM"); a.async = "false"; a.loadXML(c) }
        } catch (b) { a = undefined } if (!a || !a.documentElement || a.getElementsByTagName("parsererror").length) { ca.error("Invalid XML: " + c) } return a
    }; var ch, d2, b9 = /#.*$/, cC = /([?&])_=[^&]*/, cW = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, cR = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, b7 = /^(?:GET|HEAD)$/, dc = /^\/\//, eq = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, ci = {}, i = {}, cx = "*/".concat("*"); try { d2 = location.href } catch (dQ) { d2 = eB.createElement("a"); d2.href = ""; d2 = d2.href } ch = eq.exec(d2.toLowerCase()) || []; function d7(a) {
        return function (c, b) {
            if (typeof c !== "string") { b = c; c = "*" } var g, f = 0, d = c.toLowerCase().match(dT) || []; if (ca.isFunction(b)) {
                while ((g = d[f++])) {
                    if (g.charAt(0) === "+") {
                        g = g.slice(1) || "*";
                        (a[g] = a[g] || []).unshift(b)
                    } else { (a[g] = a[g] || []).push(b) }
                }
            }
        }
    } function ek(f, h, b, g) { var a = {}, d = (f === i); function c(k) { var j; a[k] = true; ca.each(f[k] || [], function (m, n) { var l = n(h, b, g); if (typeof l === "string" && !d && !a[l]) { h.dataTypes.unshift(l); c(l); return false } else { if (d) { return !(j = l) } } }); return j } return c(h.dataTypes[0]) || !a["*"] && c("*") } function e(f, d) { var c, a, b = ca.ajaxSettings.flatOptions || {}; for (a in d) { if (d[a] !== undefined) { (b[a] ? f : (c || (c = {})))[a] = d[a] } } if (c) { ca.extend(true, f, c) } return f } function dX(a, b, d) {
        var k, f, g, j, h = a.contents, c = a.dataTypes; while (c[0] === "*") { c.shift(); if (f === undefined) { f = a.mimeType || b.getResponseHeader("Content-Type") } } if (f) { for (j in h) { if (h[j] && h[j].test(f)) { c.unshift(j); break } } } if (c[0] in d) { g = c[0] } else {
            for (j in d) { if (!c[0] || a.converters[j + " " + c[0]]) { g = j; break } if (!k) { k = j } } g = g || k
        } if (g) { if (g !== c[0]) { c.unshift(g) } return d[g] }
    } function en(a, j, d, n) { var m, k, c, h, g, b = {}, f = a.dataTypes.slice(); if (f[1]) { for (c in a.converters) { b[c.toLowerCase()] = a.converters[c] } } k = f.shift(); while (k) { if (a.responseFields[k]) { d[a.responseFields[k]] = j } if (!g && n && a.dataFilter) { j = a.dataFilter(j, a.dataType) } g = k; k = f.shift(); if (k) { if (k === "*") { k = g } else { if (g !== "*" && g !== k) { c = b[g + " " + k] || b["* " + k]; if (!c) { for (m in b) { h = m.split(" "); if (h[1] === k) { c = b[g + " " + h[0]] || b["* " + h[0]]; if (c) { if (c === true) { c = b[m] } else { if (b[m] !== true) { k = h[0]; f.unshift(h[1]) } } break } } } } if (c !== true) { if (c && a["throws"]) { j = c(j) } else { try { j = c(j) } catch (l) { return { state: "parsererror", error: c ? l : "No conversion from " + g + " to " + k } } } } } } } } return { state: "success", data: j } } ca.extend({
        active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: d2, type: "GET", isLocal: cR.test(ch[1]), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": cx, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": true, "text json": ca.parseJSON, "text xml": ca.parseXML }, flatOptions: { url: true, context: true } }, ajaxSetup: function (a, b) {
            return b ? e(e(a, ca.ajaxSettings), b) : e(ca.ajaxSettings, a)
        }, ajaxPrefilter: d7(ci), ajaxTransport: d7(i), ajax: function (r, u) {
            if (typeof r === "object") { u = r; r = undefined } u = u || {}; var k, h, y, b, o, v, g, t, p = ca.ajaxSetup({}, u), w = p.context || p, m = p.context && (w.nodeType || w.jquery) ? ca(w) : ca.event, a = ca.Deferred(), d = ca.Callbacks("once memory"), x = p.statusCode || {}, l = {}, c = {}, s = 0, q = "canceled", j = {
                readyState: 0, getResponseHeader: function (z) { var A; if (s === 2) { if (!t) { t = {}; while ((A = cW.exec(b))) { t[A[1].toLowerCase()] = A[2] } } A = t[z.toLowerCase()] } return A == null ? null : A }, getAllResponseHeaders: function () { return s === 2 ? b : null }, setRequestHeader: function (z, A) { var B = z.toLowerCase(); if (!s) { z = c[B] = c[B] || z; l[z] = A } return this }, overrideMimeType: function (z) { if (!s) { p.mimeType = z } return this }, statusCode: function (z) { var A; if (z) { if (s < 2) { for (A in z) { x[A] = [x[A], z[A]] } } else { j.always(z[j.status]) } } return this }, abort: function (z) {
                    var A = z || q;
                    if (g) { g.abort(A) } n(0, A); return this
                }
            }; a.promise(j).complete = d.add; j.success = j.done; j.error = j.fail; p.url = ((r || p.url || d2) + "").replace(b9, "").replace(dc, ch[1] + "//"); p.type = u.method || u.type || p.method || p.type; p.dataTypes = ca.trim(p.dataType || "*").toLowerCase().match(dT) || [""]; if (p.crossDomain == null) { k = eq.exec(p.url.toLowerCase()); p.crossDomain = !!(k && (k[1] !== ch[1] || k[2] !== ch[2] || (k[3] || (k[1] === "http:" ? "80" : "443")) !== (ch[3] || (ch[1] === "http:" ? "80" : "443")))) } if (p.data && p.processData && typeof p.data !== "string") { p.data = ca.param(p.data, p.traditional) } ek(ci, p, u, j); if (s === 2) { return j } v = ca.event && p.global; if (v && ca.active++ === 0) { ca.event.trigger("ajaxStart") } p.type = p.type.toUpperCase(); p.hasContent = !b7.test(p.type); y = p.url; if (!p.hasContent) {
                if (p.data) { y = (p.url += (a7.test(y) ? "&" : "?") + p.data); delete p.data } if (p.cache === false) {
                p.url = cC.test(y) ? y.replace(cC, "$1_=" + ef++) : y + (a7.test(y) ? "&" : "?") + "_=" + ef++
                }
            } if (p.ifModified) { if (ca.lastModified[y]) { j.setRequestHeader("If-Modified-Since", ca.lastModified[y]) } if (ca.etag[y]) { j.setRequestHeader("If-None-Match", ca.etag[y]) } } if (p.data && p.hasContent && p.contentType !== false || u.contentType) { j.setRequestHeader("Content-Type", p.contentType) } j.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + (p.dataTypes[0] !== "*" ? ", " + cx + "; q=0.01" : "") : p.accepts["*"]); for (h in p.headers) { j.setRequestHeader(h, p.headers[h]) } if (p.beforeSend && (p.beforeSend.call(w, j, p) === false || s === 2)) { return j.abort() } q = "abort"; for (h in { success: 1, error: 1, complete: 1 }) { j[h](p[h]) } g = ek(i, p, u, j); if (!g) { n(-1, "No Transport") } else {
            j.readyState = 1; if (v) { m.trigger("ajaxSend", [j, p]) } if (p.async && p.timeout > 0) {
                o = setTimeout(function () { j.abort("timeout") }, p.timeout)
            } try { s = 1; g.send(l, n) } catch (f) { if (s < 2) { n(-1, f) } else { throw f } }
            } function n(z, I, H, B) {
                var D, E, G, A, F, C = I; if (s === 2) { return } s = 2; if (o) { clearTimeout(o) } g = undefined; b = B || ""; j.readyState = z > 0 ? 4 : 0; D = z >= 200 && z < 300 || z === 304; if (H) { A = dX(p, j, H) } A = en(p, A, j, D); if (D) { if (p.ifModified) { F = j.getResponseHeader("Last-Modified"); if (F) { ca.lastModified[y] = F } F = j.getResponseHeader("etag"); if (F) { ca.etag[y] = F } } if (z === 204 || p.type === "HEAD") { C = "nocontent" } else { if (z === 304) { C = "notmodified" } else { C = A.state; E = A.data; G = A.error; D = !G } } } else { G = C; if (z || !C) { C = "error"; if (z < 0) { z = 0 } } } j.status = z; j.statusText = (I || C) + ""; if (D) { a.resolveWith(w, [E, C, j]) } else { a.rejectWith(w, [j, C, G]) } j.statusCode(x); x = undefined; if (v) { m.trigger(D ? "ajaxSuccess" : "ajaxError", [j, p, D ? E : G]) } d.fireWith(w, [j, C]); if (v) {
                    m.trigger("ajaxComplete", [j, p]); if (!(--ca.active)) {
                        ca.event.trigger("ajaxStop")
                    }
                }
            } return j
        }, getJSON: function (b, a, c) { return ca.get(b, a, c, "json") }, getScript: function (b, a) { return ca.get(b, undefined, a, "script") }
    }); ca.each(["get", "post"], function (a, b) { ca[b] = function (c, f, d, g) { if (ca.isFunction(f)) { g = g || d; d = f; f = undefined } return ca.ajax({ url: c, type: b, dataType: g, data: f, success: d }) } }); ca._evalUrl = function (a) { return ca.ajax({ url: a, type: "GET", dataType: "script", async: false, global: false, "throws": true }) }; ca.fn.extend({
        wrapAll: function (b) { if (ca.isFunction(b)) { return this.each(function (c) { ca(this).wrapAll(b.call(this, c)) }) } if (this[0]) { var a = ca(b, this[0].ownerDocument).eq(0).clone(true); if (this[0].parentNode) { a.insertBefore(this[0]) } a.map(function () { var c = this; while (c.firstChild && c.firstChild.nodeType === 1) { c = c.firstChild } return c }).append(this) } return this }, wrapInner: function (a) {
            if (ca.isFunction(a)) {
                return this.each(function (b) {
                    ca(this).wrapInner(a.call(this, b))
                })
            } return this.each(function () { var b = ca(this), c = b.contents(); if (c.length) { c.wrapAll(a) } else { b.append(a) } })
        }, wrap: function (b) { var a = ca.isFunction(b); return this.each(function (c) { ca(this).wrapAll(a ? b.call(this, c) : b) }) }, unwrap: function () { return this.parent().each(function () { if (!ca.nodeName(this, "body")) { ca(this).replaceWith(this.childNodes) } }).end() }
    }); ca.expr.filters.hidden = function (a) { return a.offsetWidth <= 0 && a.offsetHeight <= 0 || (!d9.reliableHiddenOffsets() && ((a.style && a.style.display) || ca.css(a, "display")) === "none") }; ca.expr.filters.visible = function (a) { return !ca.expr.filters.hidden(a) }; var cr = /%20/g, cg = /\[\]$/, d3 = /\r?\n/g, dG = /^(?:submit|button|image|reset|file)$/i, b6 = /^(?:input|select|textarea|keygen)/i; function dJ(f, c, a, d) {
        var b; if (ca.isArray(c)) {
            ca.each(c, function (g, h) {
                if (a || cg.test(f)) {
                    d(f, h)
                } else { dJ(f + "[" + (typeof h === "object" ? g : "") + "]", h, a, d) }
            })
        } else { if (!a && ca.type(c) === "object") { for (b in c) { dJ(f + "[" + b + "]", c[b], a, d) } } else { d(f, c) } }
    } ca.param = function (c, f) { var d, a = [], b = function (h, g) { g = ca.isFunction(g) ? g() : (g == null ? "" : g); a[a.length] = encodeURIComponent(h) + "=" + encodeURIComponent(g) }; if (f === undefined) { f = ca.ajaxSettings && ca.ajaxSettings.traditional } if (ca.isArray(c) || (c.jquery && !ca.isPlainObject(c))) { ca.each(c, function () { b(this.name, this.value) }) } else { for (d in c) { dJ(d, c[d], f, b) } } return a.join("&").replace(cr, "+") }; ca.fn.extend({
        serialize: function () { return ca.param(this.serializeArray()) }, serializeArray: function () {
            return this.map(function () { var a = ca.prop(this, "elements"); return a ? ca.makeArray(a) : this }).filter(function () {
                var a = this.type; return this.name && !ca(this).is(":disabled") && b6.test(this.nodeName) && !dG.test(a) && (this.checked || !c0.test(a))
            }).map(function (a, c) { var b = ca(this).val(); return b == null ? null : ca.isArray(b) ? ca.map(b, function (d) { return { name: c.name, value: d.replace(d3, "\r\n") } }) : { name: c.name, value: b.replace(d3, "\r\n") } }).get()
        }
    }); ca.ajaxSettings.xhr = eg.ActiveXObject !== undefined ? function () { return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && dV() || cH() } : dV; var du = 0, dC = {}, dg = ca.ajaxSettings.xhr(); if (eg.attachEvent) { eg.attachEvent("onunload", function () { for (var a in dC) { dC[a](undefined, true) } }) } d9.cors = !!dg && ("withCredentials" in dg); dg = d9.ajax = !!dg; if (dg) {
        ca.ajaxTransport(function (b) {
            if (!b.crossDomain || d9.cors) {
                var a; return {
                    send: function (d, h) {
                        var g, f = b.xhr(), c = ++du; f.open(b.type, b.url, b.async, b.username, b.password); if (b.xhrFields) { for (g in b.xhrFields) { f[g] = b.xhrFields[g] } } if (b.mimeType && f.overrideMimeType) {
                            f.overrideMimeType(b.mimeType)
                        } if (!b.crossDomain && !d["X-Requested-With"]) { d["X-Requested-With"] = "XMLHttpRequest" } for (g in d) { if (d[g] !== undefined) { f.setRequestHeader(g, d[g] + "") } } f.send((b.hasContent && b.data) || null); a = function (o, j) { var k, l, n; if (a && (j || f.readyState === 4)) { delete dC[c]; a = undefined; f.onreadystatechange = ca.noop; if (j) { if (f.readyState !== 4) { f.abort() } } else { n = {}; k = f.status; if (typeof f.responseText === "string") { n.text = f.responseText } try { l = f.statusText } catch (m) { l = "" } if (!k && b.isLocal && !b.crossDomain) { k = n.text ? 200 : 404 } else { if (k === 1223) { k = 204 } } } } if (n) { h(k, l, n, f.getAllResponseHeaders()) } }; if (!b.async) { a() } else { if (f.readyState === 4) { setTimeout(a) } else { f.onreadystatechange = dC[c] = a } }
                    }, abort: function () { if (a) { a(undefined, true) } }
                }
            }
        })
    } function dV() { try { return new eg.XMLHttpRequest() } catch (a) { } } function cH() {
        try {
            return new eg.ActiveXObject("Microsoft.XMLHTTP")
        } catch (a) { }
    } ca.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (a) { ca.globalEval(a); return a } } }); ca.ajaxPrefilter("script", function (a) { if (a.cache === undefined) { a.cache = false } if (a.crossDomain) { a.type = "GET"; a.global = false } }); ca.ajaxTransport("script", function (c) {
        if (c.crossDomain) {
            var b, a = eB.head || ca("head")[0] || eB.documentElement; return {
                send: function (f, d) {
                    b = eB.createElement("script"); b.async = true; if (c.scriptCharset) { b.charset = c.scriptCharset } b.src = c.url; b.onload = b.onreadystatechange = function (g, h) {
                        if (h || !b.readyState || /loaded|complete/.test(b.readyState)) {
                        b.onload = b.onreadystatechange = null; if (b.parentNode) { b.parentNode.removeChild(b) } b = null; if (!h) {
                            d(200, "success")
                        }
                        }
                    }; a.insertBefore(b, a.firstChild)
                }, abort: function () { if (b) { b.onload(undefined, true) } }
            }
        }
    }); var ei = [], dF = /(=)\?(?=&|$)|\?\?/; ca.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = ei.pop() || (ca.expando + "_" + (ef++)); this[a] = true; return a } }); ca.ajaxPrefilter("json jsonp", function (g, f, d) {
        var b, a, h, c = g.jsonp !== false && (dF.test(g.url) ? "url" : typeof g.data === "string" && !(g.contentType || "").indexOf("application/x-www-form-urlencoded") && dF.test(g.data) && "data"); if (c || g.dataTypes[0] === "jsonp") {
            b = g.jsonpCallback = ca.isFunction(g.jsonpCallback) ? g.jsonpCallback() : g.jsonpCallback; if (c) { g[c] = g[c].replace(dF, "$1" + b) } else { if (g.jsonp !== false) { g.url += (a7.test(g.url) ? "&" : "?") + g.jsonp + "=" + b } } g.converters["script json"] = function () { if (!h) { ca.error(b + " was not called") } return h[0] }; g.dataTypes[0] = "json"; a = eg[b]; eg[b] = function () {
                h = arguments
            }; d.always(function () { eg[b] = a; if (g[b]) { g.jsonpCallback = f.jsonpCallback; ei.push(b) } if (h && ca.isFunction(a)) { a(h[0]) } h = a = undefined }); return "script"
        }
    }); ca.parseHTML = function (c, f, d) { if (!c || typeof c !== "string") { return null } if (typeof f === "boolean") { d = f; f = false } f = f || eB; var a = es.exec(c), b = !d && []; if (a) { return [f.createElement(a[1])] } a = ca.buildFragment([c], f, b); if (b && b.length) { ca(b).remove() } return ca.merge([], a.childNodes) }; var dR = ca.fn.load; ca.fn.load = function (h, g, f) {
        if (typeof h !== "string" && dR) { return dR.apply(this, arguments) } var d, j, a, c = this, b = h.indexOf(" "); if (b >= 0) { d = ca.trim(h.slice(b, h.length)); h = h.slice(0, b) } if (ca.isFunction(g)) { f = g; g = undefined } else { if (g && typeof g === "object") { a = "POST" } } if (c.length > 0) {
            ca.ajax({ url: h, type: a, dataType: "html", data: g }).done(function (k) {
                j = arguments; c.html(d ? ca("<div>").append(ca.parseHTML(k)).find(d) : k)
            }).complete(f && function (k, l) { c.each(f, j || [k.responseText, l, k]) })
        } return this
    }; ca.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) { ca.fn[b] = function (c) { return this.on(b, c) } }); ca.expr.filters.animated = function (a) { return ca.grep(ca.timers, function (b) { return a === b.elem }).length }; var cS = eg.document.documentElement; function dP(a) { return ca.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false } ca.offset = {
        setOffset: function (k, a, h) {
            var f, m, o, j, l, c, b, g = ca.css(k, "position"), n = ca(k), d = {}; if (g === "static") { k.style.position = "relative" } l = n.offset(); o = ca.css(k, "top"); c = ca.css(k, "left"); b = (g === "absolute" || g === "fixed") && ca.inArray("auto", [o, c]) > -1; if (b) { f = n.position(); j = f.top; m = f.left } else { j = parseFloat(o) || 0; m = parseFloat(c) || 0 } if (ca.isFunction(a)) {
                a = a.call(k, h, l)
            } if (a.top != null) { d.top = (a.top - l.top) + j } if (a.left != null) { d.left = (a.left - l.left) + m } if ("using" in a) { a.using.call(k, d) } else { n.css(d) }
        }
    }; ca.fn.extend({
        offset: function (a) { if (arguments.length) { return a === undefined ? this : this.each(function (h) { ca.offset.setOffset(this, a, h) }) } var d, c, f = { top: 0, left: 0 }, g = this[0], b = g && g.ownerDocument; if (!b) { return } d = b.documentElement; if (!ca.contains(d, g)) { return f } if (typeof g.getBoundingClientRect !== dv) { f = g.getBoundingClientRect() } c = dP(b); return { top: f.top + (c.pageYOffset || d.scrollTop) - (d.clientTop || 0), left: f.left + (c.pageXOffset || d.scrollLeft) - (d.clientLeft || 0) } }, position: function () {
            if (!this[0]) { return } var d, c, b = { top: 0, left: 0 }, a = this[0]; if (ca.css(a, "position") === "fixed") { c = a.getBoundingClientRect() } else {
                d = this.offsetParent(); c = this.offset(); if (!ca.nodeName(d[0], "html")) {
                    b = d.offset()
                } b.top += ca.css(d[0], "borderTopWidth", true); b.left += ca.css(d[0], "borderLeftWidth", true)
            } return { top: c.top - b.top - ca.css(a, "marginTop", true), left: c.left - b.left - ca.css(a, "marginLeft", true) }
        }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || cS; while (a && (!ca.nodeName(a, "html") && ca.css(a, "position") === "static")) { a = a.offsetParent } return a || cS }) }
    }); ca.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (c, a) { var b = /Y/.test(a); ca.fn[c] = function (d) { return cD(this, function (j, f, g) { var h = dP(j); if (g === undefined) { return h ? (a in h) ? h[a] : h.document.documentElement[f] : j[f] } if (h) { h.scrollTo(!b ? g : ca(h).scrollLeft(), b ? g : ca(h).scrollTop()) } else { j[f] = g } }, c, d, arguments.length, null) } }); ca.each(["top", "left"], function (a, b) {
    ca.cssHooks[b] = dj(d9.pixelPosition, function (d, c) {
        if (c) {
            c = dn(d, b);
            return dH.test(c) ? ca(d).position()[b] + "px" : c
        }
    })
    }); ca.each({ Height: "height", Width: "width" }, function (b, a) { ca.each({ padding: "inner" + b, content: a, "": "outer" + b }, function (d, c) { ca.fn[c] = function (f, g) { var h = arguments.length && (d || typeof f !== "boolean"), j = d || (f === true || g === true ? "margin" : "border"); return cD(this, function (l, m, k) { var n; if (ca.isWindow(l)) { return l.document.documentElement["client" + b] } if (l.nodeType === 9) { n = l.documentElement; return Math.max(l.body["scroll" + b], n["scroll" + b], l.body["offset" + b], n["offset" + b], n["client" + b]) } return k === undefined ? ca.css(l, m, j) : ca.style(l, m, k, j) }, a, h ? f : undefined, h, null) } }) }); ca.fn.size = function () { return this.length }; ca.fn.andSelf = ca.fn.addBack; if (typeof define === "function" && define.amd) { define("jquery", [], function () { return ca }) } var da = eg.jQuery, cG = eg.$; ca.noConflict = function (a) {
        if (eg.$ === ca) {
        eg.$ = cG
        } if (a && eg.jQuery === ca) { eg.jQuery = da } return ca
    }; if (typeof cB === dv) { eg.jQuery = eg.$ = ca } return ca
})); jQuery.cookie = function (q, v, s) {
    if (typeof v != "undefined") { s = s || {}; if (v === null) { v = ""; s.expires = -1 } var n = ""; if (s.expires && (typeof s.expires == "number" || s.expires.toUTCString)) { var i; if (typeof s.expires == "number") { i = new Date(); i.setTime(i.getTime() + (s.expires * 24 * 60 * 60 * 1000)) } else { i = s.expires } n = "; expires=" + i.toUTCString() } var t = s.path ? "; path=" + (s.path) : ""; var x = s.domain ? "; domain=" + (s.domain) : ""; var r = s.secure ? "; secure" : ""; document.cookie = [q, "=", encodeURIComponent(v), n, t, x, r].join("") } else {
        var o = null; if (document.cookie && document.cookie != "") {
            var u = document.cookie.split(";"); for (var w = 0; w < u.length; w++) {
                var p = jQuery.trim(u[w]); if (p.substring(0, q.length + 1) == (q + "=")) {
                    o = decodeURIComponent(p.substring(q.length + 1));
                    break
                }
            }
        } return o
    }
}; var isNarrowscreen = screen.width; if (window.isBigWide) { $("body").attr("class", "w1200") } if (isNarrowscreen < 1228) { $("body").attr("class", "w980") } else { if (isNarrowscreen > 1500) { if (window.isBigWide) { $("body").attr("class", "w1200 w1440") } } } function resize() { if (typeof (isFixedW980screen) != "undefined" && isFixedW980screen) { $("body").attr("class", "w980"); return } var b = $(window).width(); if (b < 1228) { $("body").attr("class", "w980") } else { if (b > 1500) { if (window.isBigWide) { $("body").attr("class", "w1200 w1440") } } else { if (window.isBigWide) { $("body").attr("class", "w1200") } else { $("body").attr("class", "") } } } } resize(); $(window).resize(function (b) { resize() });
/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function (Z, S, R) {
Z.migrateMute = 1;
    var ac = {}; Z.migrateWarnings = []; if (!Z.migrateMute && S.console && S.console.log) { S.console.log("JQMIGRATE: Logging is active") } if (Z.migrateTrace === R) { Z.migrateTrace = true } Z.migrateReset = function () { ac = {}; Z.migrateWarnings.length = 0 }; function W(a) { var b = S.console; if (!ac[a]) { ac[a] = true; Z.migrateWarnings.push(a); if (b && b.warn && !Z.migrateMute) { b.warn("JQMIGRATE: " + a); if (Z.migrateTrace && b.trace) { b.trace() } } } } function ak(b, e, c, a) { if (Object.defineProperty) { try { Object.defineProperty(b, e, { configurable: true, enumerable: true, get: function () { W(a); return c }, set: function (f) { W(a); c = f } }); return } catch (d) { } } Z._definePropertyBroken = true; b[e] = c } if (document.compatMode === "BackCompat") { W("jQuery is not compatible with Quirks Mode") } var aa = Z("<input/>", { size: 1 }).attr("size") && Z.attrFn, U = Z.attr, G = Z.attrHooks.value && Z.attrHooks.value.get || function () {
        return null
    }, Q = Z.attrHooks.value && Z.attrHooks.value.set || function () { return R }, Y = /^(?:input|button)$/i, N = /^[238]$/, ai = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, al = /^(?:checked|selected)$/i; ak(Z, "attrFn", aa || {}, "jQuery.attrFn is deprecated"); Z.attr = function (b, d, a, c) {
        var e = d.toLowerCase(), f = b && b.nodeType; if (c) { if (U.length < 4) { W("jQuery.fn.attr( props, pass ) is deprecated") } if (b && !N.test(f) && (aa ? d in aa : Z.isFunction(Z.fn[d]))) { return Z(b)[d](a) } } if (d === "type" && a !== R && Y.test(b.nodeName) && b.parentNode) { W("Can't change the 'type' of an input or button in IE 6/7/8") } if (!Z.attrHooks[e] && ai.test(e)) {
        Z.attrHooks[e] = {
            get: function (i, j) {
                var g, h = Z.prop(i, j); return h === true || typeof h !== "boolean" && (g = i.getAttributeNode(j)) && g.nodeValue !== false ? j.toLowerCase() : R
            }, set: function (i, g, j) { var h; if (g === false) { Z.removeAttr(i, j) } else { h = Z.propFix[j] || j; if (h in i) { i[h] = true } i.setAttribute(j, j.toLowerCase()) } return j }
        }; if (al.test(e)) { W("jQuery.fn.attr('" + e + "') may use property instead of attribute") }
        } return U.call(Z, b, d, a)
    }; Z.attrHooks.value = { get: function (b, c) { var a = (b.nodeName || "").toLowerCase(); if (a === "button") { return G.apply(this, arguments) } if (a !== "input" && a !== "option") { W("jQuery.fn.attr('value') no longer gets properties") } return c in b ? b.value : null }, set: function (c, b) { var a = (c.nodeName || "").toLowerCase(); if (a === "button") { return Q.apply(this, arguments) } if (a !== "input" && a !== "option") { W("jQuery.fn.attr('value', val) no longer sets properties") } c.value = b } }; var O, M, L = Z.fn.init, P = Z.parseJSON, I = /^([^<]*)(<[\w\W]+>)([^>]*)$/; Z.fn.init = function (b, c, d) {
        var a; if (b && typeof b === "string" && !Z.isPlainObject(c) && (a = I.exec(Z.trim(b))) && a[0]) {
            if (b.charAt(0) !== "<") {
                W("$(html) HTML strings must start with '<' character")
            } if (a[3]) { W("$(html) HTML text after last tag is ignored") } if (a[0].charAt(0) === "#") { W("HTML string cannot start with a '#' character"); Z.error("JQMIGRATE: Invalid selector string (XSS)") } if (c && c.context) { c = c.context } if (Z.parseHTML) { return L.call(this, Z.parseHTML(a[2], c, true), c, d) }
        } return L.apply(this, arguments)
    }; Z.fn.init.prototype = Z.fn; Z.parseJSON = function (a) { if (!a && a !== null) { W("jQuery.parseJSON requires a valid JSON string"); return null } return P.apply(this, arguments) }; Z.uaMatch = function (a) { a = a.toLowerCase(); var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || []; return { browser: b[1] || "", version: b[2] || "0" } }; if (!Z.browser) {
        O = Z.uaMatch(navigator.userAgent);
        M = {}; if (O.browser) { M[O.browser] = true; M.version = O.version } if (M.chrome) { M.webkit = true } else { if (M.webkit) { M.safari = true } } Z.browser = M
    } ak(Z, "browser", Z.browser, "jQuery.browser is deprecated"); Z.sub = function () { function c(e, d) { return new c.fn.init(e, d) } Z.extend(true, c, this); c.superclass = this; c.fn = c.prototype = this(); c.fn.constructor = c; c.sub = this.sub; c.fn.init = function a(e, d) { if (d && d instanceof Z && !(d instanceof c)) { d = c(d) } return Z.fn.init.call(this, e, d, b) }; c.fn.init.prototype = c.fn; var b = c(document); W("jQuery.sub() is deprecated"); return c }; Z.ajaxSetup({ converters: { "text json": Z.parseJSON } }); var V = Z.fn.data; Z.fn.data = function (d) {
        var a, b, c = this[0]; if (c && d === "events" && arguments.length === 1) {
            a = Z.data(c, d); b = Z._data(c, d); if ((a === R || a === b) && b !== R) {
                W("Use of jQuery.fn.data('events') is deprecated"); return b
            }
        } return V.apply(this, arguments)
    }; var T = /\/(java|ecma)script/i, K = Z.fn.andSelf || Z.fn.addBack; Z.fn.andSelf = function () { W("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"); return K.apply(this, arguments) }; if (!Z.clean) { Z.clean = function (i, h, b, f) { h = h || document; h = !h.nodeType && h[0] || h; h = h.ownerDocument || h; W("jQuery.clean() is deprecated"); var e, g, d, a, c = []; Z.merge(c, Z.buildFragment(i, h).childNodes); if (b) { d = function (j) { if (!j.type || T.test(j.type)) { return f ? f.push(j.parentNode ? j.parentNode.removeChild(j) : j) : b.appendChild(j) } }; for (e = 0; (g = c[e]) != null; e++) { if (!(Z.nodeName(g, "script") && d(g))) { b.appendChild(g); if (typeof g.getElementsByTagName !== "undefined") { a = Z.grep(Z.merge([], g.getElementsByTagName("script")), d); c.splice.apply(c, [e + 1, 0].concat(a)); e += a.length } } } } return c } } var ag = Z.event.add, ah = Z.event.remove, H = Z.event.trigger, af = Z.fn.toggle, ae = Z.fn.live, X = Z.fn.die, ad = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", ab = new RegExp("\\b(?:" + ad + ")\\b"), J = /(?:^|\s)hover(\.\S+|)\b/, aj = function (a) {
        if (typeof (a) !== "string" || Z.event.special.hover) {
            return a
        } if (J.test(a)) { W("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'") } return a && a.replace(J, "mouseenter$1 mouseleave$1")
    }; if (Z.event.props && Z.event.props[0] !== "attrChange") { Z.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement") } if (Z.event.dispatch) { ak(Z.event, "handle", Z.event.dispatch, "jQuery.event.handle is undocumented and deprecated") } Z.event.add = function (a, c, b, e, d) { if (a !== document && ab.test(c)) { W("AJAX events should be attached to document: " + c) } ag.call(this, a, aj(c || ""), b, e, d) }; Z.event.remove = function (e, b, a, d, c) { ah.call(this, e, aj(b) || "", a, d, c) }; Z.fn.error = function () {
        var a = Array.prototype.slice.call(arguments, 0); W("jQuery.fn.error() is deprecated"); a.splice(0, 0, "error"); if (arguments.length) { return this.bind.apply(this, a) } this.triggerHandler.apply(this, a); return this
    }; Z.fn.toggle = function (b, d) { if (!Z.isFunction(b) || !Z.isFunction(d)) { return af.apply(this, arguments) } W("jQuery.fn.toggle(handler, handler...) is deprecated"); var e = arguments, f = b.guid || Z.guid++, c = 0, a = function (h) { var g = (Z._data(this, "lastToggle" + b.guid) || 0) % c; Z._data(this, "lastToggle" + b.guid, g + 1); h.preventDefault(); return e[g].apply(this, arguments) || false }; a.guid = f; while (c < e.length) { e[c++].guid = f } return this.click(a) }; Z.fn.live = function (c, a, b) { W("jQuery.fn.live() is deprecated"); if (ae) { return ae.apply(this, arguments) } Z(this.context).on(c, this.selector, a, b); return this }; Z.fn.die = function (b, a) { W("jQuery.fn.die() is deprecated"); if (X) { return X.apply(this, arguments) } Z(this.context).off(b, this.selector || "**", a); return this }; Z.event.trigger = function (d, c, a, b) {
        if (!a && !ab.test(d)) {
            W("Global events are undocumented and deprecated")
        } return H.call(this, d, c, a || document, b)
    }; Z.each(ad.split("|"), function (a, b) { Z.event.special[b] = { setup: function () { var c = this; if (c !== document) { Z.event.add(document, b + "." + Z.guid, function () { Z.event.trigger(b, null, c, true) }); Z._data(this, b, Z.guid++) } return false }, teardown: function () { if (this !== document) { Z.event.remove(document, b + "." + Z._data(this, b)) } return false } } })
})(jQuery, window); (function (c) {
    c.fn.bgIframe = c.fn.bgiframe = function (b) {
        if (c.browser.msie && parseInt(c.browser.version) <= 6) {
            b = c.extend({ top: "auto", left: "auto", width: "auto", height: "auto", opacity: true, src: "javascript:false;" }, b || {}); var a = function (e) { return e && e.constructor == Number ? e + "px" : e }, f = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + b.src + '"style="display:block;position:absolute;z-index:-1;' + (b.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (b.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : a(b.top)) + ";left:" + (b.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : a(b.left)) + ";width:" + (b.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : a(b.width)) + ";height:" + (b.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : a(b.height)) + ';"/>';
            return this.each(function () { if (c("> iframe.bgiframe", this).length == 0) { this.insertBefore(document.createElement(f), this.firstChild) } })
        } return this
    }; if (!c.browser.version) { if (navigator.userAgent && navigator.userAgent.toLowerCase() && navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)) { var d = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/); if (d && d.length == 2) { c.browser.version = d[1] } } }
})(jQuery); (function (c) { var d = window.loli || (window.loli = {}); d.scroll = function (l, b) { var j = ""; var i = b || 200; var k = i - 20; c(window).scroll(function () { setTimeout(function () { a() }, i); j = new Date().getTime() }); function a() { if ((new Date().getTime() - j) >= k) { l(); j = new Date().getTime() } } } })(jQuery); (function () {
    var n = window.loli || (window.loli = {}); var v = n.cookie = n.cookie || {}; var l = (typeof globalSyncCookieFlag != "undefined" && globalSyncCookieFlag == "1") ? 1 : 0;
    var s = typeof globalSyncCookieKey != "undefined" ? globalSyncCookieKey : ""; var o = "yhd.com"; var r = "yihaodian.com.hk"; if (n.cookie && n.cookie.set) { return } var p = function () { var c = document.domain; var a = /([\.\w]*)\.yhd\.com/; var b = /([\.\w]*)\.yihaodian\.com\.hk/; if (a.test(c)) { return o } else { if (b.test(c)) { return r } } return c }; var u = function () { var c = document.domain; var a = /([\.\w]*)\.yhd\.com/; var b = /([\.\w]*)\.yihaodian\.com\.hk/; if (a.test(c)) { return r } else { if (b.test(c)) { return o } } return c }; var q = function () { var c = document.domain; var a = /([\.\w]*)\.yhd\.com/; var b = /([\.\w]*)\.yihaodian\.com\.hk/; return a.test(c) || b.test(c) }; var m = function () { var a = window.navigator.userAgent.toLowerCase(); var c = /msie ([\d\.]+)/; if (c.test(a)) { var b = parseInt(c.exec(a)[1]); return b } return 0 }; var t = function () {
        var a = new Date(); return (a.getYear() + 1900) + "" + (a.getMonth() + 1) + "" + a.getDate()
    }; v.set = function (a, f, e, b, h) { var c = h || function () { }; var g = p(); var d = isNaN(b) ? null : parseInt(b); if (typeof d == "number") { $.cookie(a, f, { domain: g, path: e || "/", expires: d }) } else { $.cookie(a, f, { domain: g, path: e || "/" }) } c({ status: 1, name: a, value: f }) }; v.get = function (b, a) { var c = a || function () { }; var d = $.cookie(b); c({ status: 1, name: b, value: d }); return d }; v.getAll = function (e) { var c = e || function () { }; var g = document.cookie; var f = g.split("; "); var d = {}; for (var a = 0; a < f.length; a++) { var b = f[a].split("="); d[b[0]] = decodeURIComponent(b[1]) } c({ status: 1, data: d }); return d }; v.sendJsonpAjax = function (i, g, d, b) {
        var a = i + "?callback=" + d; var f = []; for (var h in g) { f.push("&" + h + "=" + encodeURIComponent(g[h])) } a += f.join(""); window[d] = function (j) { b(j); if (c) { c.removeChild(e) } }; var c = document.getElementsByTagName("head")[0] || document.documentElement;
        var e = document.createElement("script"); e.src = a; c.insertBefore(e, c.firstChild)
    }; v.setFromDomain = function (i, d, e, G, c, j) {
        var H = c || function () { }; var L = q(); var k = p(); var b = j || k; if (b == "yhd" || b == o) { b = o } else { if (b == "hk" || b == r) { b = r } else { b = k } } if (b == k) { v.set(i, d, e, G, c) } else {
            if (!l || !L) { H({ status: 1, name: i, value: d }); return } if (!window.postMessage || !window.addEventListener) { var f = function (w) { if (w && w.status == "1") { H({ status: 1, name: i, value: d }) } }; d = (d == null || typeof d == "undefined") ? "" : d; G = (G == null || typeof G == "undefined") ? "" : G; var g = { type: "single", key: i + "|" + d + "|" + G }; var F = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000); var I = window.location.protocol + "//www." + k + (k == o ? "/header" : "/hkHeader") + "/syncCookie.do"; v.sendJsonpAjax(I, g, F, f); return } var h = "globalCookieAdaptorForSet"; var E = $("#" + h); if (E.size() == 0) {
                var I = window.location.protocol + "//www." + b + "/hkHeader/setCookie.html?v=" + t();
                var a = document.createElement("iframe"); a.setAttribute("id", h); a.setAttribute("style", "display:none"); a.setAttribute("src", I); document.body.appendChild(a); E = $("#" + h)
            } var K = function (w) { var y = window.location.protocol + "//www." + b; var x = { name: i, value: d, path: e, expires: G, domain: b, op: "cookie" }; if (m() == 9) { d = (d == null || typeof d == "undefined") ? "" : d; G = (G == null || typeof G == "undefined") ? "" : G; e = (e == null || typeof e == "undefined") ? "" : e; x = '{"name":"' + i + '", "value":"' + d + '", "path":"' + e + '", "expires":"' + G + '", "domain":"' + b + '", "op":"cookie"}' } w.postMessage(x, y); H({ status: 1, name: i, value: d }) }; if (E.attr("loaded")) { var J = E.get(0).contentWindow; K(J) } else { E.load(function () { $(this).attr("loaded", "1"); var w = $(this).get(0).contentWindow; K(w) }) }
        }
    }; v.getFromDomain = function (E, k, b) {
        var a = k || function () { }; var J = q(); var j = p(); var c = b || j;
        if (c == "yhd" || c == o) { c = o } else { if (c == "hk" || c == r) { c = r } else { c = j } } if (c == j) { v.get(E, k) } else {
            if (!l || !J) { a({ status: 1, name: E, value: null }); return } if (!window.postMessage || !window.addEventListener) { var e = function (x) { if (x && x.status == "1") { var w = x.result ? x.result[E] : null; a({ status: 1, name: E, value: w }) } }; var D = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000); var d = window.location.protocol + "//www." + c + (c == o ? "/header" : "/hkHeader") + "/getCookie.do"; v.sendJsonpAjax(d, {}, D, e); return } var f = window.yhd_cookie_get_callback || (window.yhd_cookie_get_callback = []); f.push(a); var G = f.length - 1; var h = "globalCookieAdaptorForGet"; var i = $("#" + h); if (i.size() == 0) {
                var d = window.location.protocol + "//www." + c + "/hkHeader/getCookie.html?v=" + t(); var g = document.createElement("iframe"); g.setAttribute("id", h); g.setAttribute("style", "display:none");
                g.setAttribute("src", d); document.body.appendChild(g); i = $("#" + h)
            } var H = function (y) { var x = window.location.protocol + "//www." + c; var w = window.location.protocol + "//" + window.location.host; var z = { name: E, host: w, version: G, op: "cookie" }; if (m() == 9) { z = '{"name":"' + E + '", "host":"' + w + '", "version":"' + G + '", "op":"cookie"}' } y.postMessage(z, x) }; if (i.attr("loaded")) { var F = i.get(0).contentWindow; H(F) } else { i.load(function () { $(this).attr("loaded", "1"); var w = $(this).get(0).contentWindow; H(w) }) } var I = function (z) {
                var w = /^http[s]?:\/\/([\.\w]*)\.yhd\.com/i; var x = /^http[s]?:\/\/([\.\w]*)\.yihaodian\.com\.hk/i; if (w.test(z.origin) || x.test(z.origin)) {
                    var y = z.data; if (y) {
                        if (typeof y == "string") { y = $.parseJSON(y) } if (y.op != "cookie") { return } var A = f[y.version]; if (A) { A({ status: 1, name: y.name, value: y.value }) } else {
                            a({ status: 1, name: y.name, value: y.value })
                        }
                    }
                }
            }; if (!window.yhd_cookie_get_handler) { window.addEventListener("message", I); window.yhd_cookie_get_handler = I }
        }
    }; v.setAllDomain = function (a, d, c, b, f) { v.set(a, d, c, b); if (q()) { var e = u(); v.setFromDomain(a, d, c, b, f, e) } }; v.processServerCookie = function (c) { var a = q(); var g = typeof globalServerCookieKey != "undefined" ? globalServerCookieKey : ""; var h = $.cookie("globalServerCookieKey") || ""; var i = ""; if (!l || !a) { return } if (c) { i = c } else { if (g == h) { i = g } else { if (g != "" && h != "") { i = g + "," + h } else { if (g == "" && h != "") { i = h } else { if (g != "" && h == "") { i = g } } } } } if (!i) { return } var e = i.split(","); for (var f = 0; f < e.length; f++) { var b = e[f]; var d = b.split("|"); if (d.length == 4) { v.setFromDomain(d[0], decodeURIComponent(d[1]), "/", d[2], null, d[3]) } } }; v.processSyncCookie = function (h) {
        var b = h || s; var f = p(); var d = u(); var c = q(); if (!l || !c) { return } if (!b) { return } if (f == o) {
            var x = b.split(",");
            for (var a = 0; a < x.length; a++) { var i = x[a].split("|"); var g = i[0]; var e = i[1]; var k = $.cookie(g); if (e == "" || e == "-1" || isNaN(e)) { v.setFromDomain(g, k, "/", null, null, d) } else { v.setFromDomain(g, k, "/", e, null, d) } }
        } else { if (f == r) { var j = function (H) { if (H.status == 1) { var J = ""; var F = b.split(","); for (var E = 0; E < F.length; E++) { var G = F[E].split("|"); var I = G[0]; var w = G[1]; if (H.name == I) { J = w; break } } if (J == "" || J == "-1" || isNaN(J)) { v.set(H.name, H.value, "/") } else { v.set(H.name, H.value, "/", J) } } }; var x = b.split(","); for (var a = 0; a < x.length; a++) { var i = x[a].split("|"); var g = i[0]; v.getFromDomain(g, j, d) } } }
    }; v.sync = function (G, H) {
        var F = G || ""; var I = H || function () { }; var h = p(); var D = u(); var J = q(); if (!l || !J) { return } if (!F) { return } var d = []; var a = []; if (typeof F == "string") { d = F.split(",") } else { d = F } var k = function (w) {
            if (w.status == 1) { a.push(w.name) } if (a.length == d.length) {
                I({ status: 1 })
            }
        }; for (var g = 0; g < d.length; g++) { var c = d[g].split("|"); var E = c[0]; var b = c[1]; var f = $.cookie(E); if (b == null) { var i = s.split(","); for (var j = 0; j < i.length; j++) { var e = i[j].split("|"); if (E == e[0]) { b = e[1]; break } } } if (b == "" || b == "-1" || isNaN(b)) { v.setFromDomain(E, f, "/", null, k, D) } else { v.setFromDomain(E, f, "/", b, k, D) } }
    }; v.getAllFromDomain = function (h, e) { var b = h || function () { }; var f = q(); var i = p(); var d = e || i; if (d == "yhd" || d == o) { d = o } else { if (d == "hk" || d == r) { d = r } else { d = i } } if (d == i) { v.getAll(h) } else { if (!l || !f) { b({ status: 1, data: null }); return } var g = function (k) { if (k && k.status == "1") { var j = k.result; b({ status: 1, data: j }) } }; var c = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000); var a = window.location.protocol + "//www." + d + (d == o ? "/header" : "/hkHeader") + "/getCookie.do"; v.sendJsonpAjax(a, {}, c, g); return } }; v.setYhdLocation = function (i, f) {
        var b = f || function () { };
        var d = 2; var e = 2817; var g = "2_2817_51973_0"; if (typeof (i) != "undefined" && i && i != "") { var c = i.split("_"); d = c[0]; e = c[1]; g = i } var h = $.cookie("yhd_location") || ""; $.cookie("provinceId", d, { domain: "yhd.com", path: "/", expires: 800 }); $.cookie("cityId", e, { domain: "yhd.com", path: "/", expires: 800 }); $.cookie("yhd_location", g, { domain: "yhd.com", path: "/", expires: 800 }); if (!location) { $.cookie("yhd_coord", "", { domain: "yhd.com", path: "/", expires: -1 }) } else { var a = h.split("_"); if (a.length < 4 || d != a[0] || e != a[1]) { $.cookie("yhd_coord", "", { domain: "yhd.com", path: "/", expires: -1 }) } } b({ status: 1 })
    }; $(function () { var a = q(); if (!l || !a) { return } v.processServerCookie() })
})();
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
; !function (a) {
"function" == typeof define && define.amd ? define("mousewheel", ["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function (g) {
    function h(s) {
        var t = s || window.event, v = d.call(arguments, 1), p = 0, l = 0, m = 0, n = 0, o = 0, q = 0; if (s = g.event.fix(t), s.type = "mousewheel", "detail" in t && (m = -1 * t.detail), "wheelDelta" in t && (m = t.wheelDelta), "wheelDeltaY" in t && (m = t.wheelDeltaY), "wheelDeltaX" in t && (l = -1 * t.wheelDeltaX), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (l = -1 * m, m = 0), p = 0 === m ? l : m, "deltaY" in t && (m = -1 * t.deltaY, p = m), "deltaX" in t && (l = t.deltaX, 0 === m && (p = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === t.deltaMode) { var r = g.data(this, "mousewheel-line-height"); p *= r, m *= r, l *= r } else { if (2 === t.deltaMode) { var u = g.data(this, "mousewheel-page-height"); p *= u, m *= u, l *= u } } if (n = Math.max(Math.abs(m), Math.abs(l)), (!a || a > n) && (a = n, j(t, n) && (a /= 40)), j(t, n) && (p /= 40, l /= 40, m /= 40), p = Math[p >= 1 ? "floor" : "ceil"](p / a), l = Math[l >= 1 ? "floor" : "ceil"](l / a), m = Math[m >= 1 ? "floor" : "ceil"](m / a), f.settings.normalizeOffset && this.getBoundingClientRect) {
                var x = this.getBoundingClientRect();
                o = s.clientX - x.left, q = s.clientY - x.top
            } return s.deltaX = l, s.deltaY = m, s.deltaFactor = a, s.offsetX = o, s.offsetY = q, s.deltaMode = 0, v.unshift(s, p, l, m), k && clearTimeout(k), k = setTimeout(i, 200), (g.event.dispatch || g.event.handle).apply(this, v)
        }
    } function i() { a = null } function j(l, m) { return f.settings.adjustOldDeltas && "mousewheel" === l.type && m % 120 === 0 } var k, a, b = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], c = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], d = Array.prototype.slice; if (g.event.fixHooks) { for (var e = b.length; e;) { g.event.fixHooks[b[--e]] = g.event.mouseHooks } } var f = g.event.special.mousewheel = {
        version: "3.1.12", setup: function () {
            if (this.addEventListener) { for (var l = c.length; l;) { this.addEventListener(c[--l], h, !1) } } else {
            this.onmousewheel = h
            } g.data(this, "mousewheel-line-height", f.getLineHeight(this)), g.data(this, "mousewheel-page-height", f.getPageHeight(this))
        }, teardown: function () { if (this.removeEventListener) { for (var l = c.length; l;) { this.removeEventListener(c[--l], h, !1) } } else { this.onmousewheel = null } g.removeData(this, "mousewheel-line-height"), g.removeData(this, "mousewheel-page-height") }, getLineHeight: function (l) { var m = g(l), n = m["offsetParent" in g.fn ? "offsetParent" : "parent"](); return n.length || (n = g("body")), parseInt(n.css("fontSize"), 10) || parseInt(m.css("fontSize"), 10) || 16 }, getPageHeight: function (l) { return g(l).height() }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
    }; g.fn.extend({ mousewheel: function (l) { return l ? this.bind("mousewheel", l) : this.trigger("mousewheel") }, unmousewheel: function (l) { return this.unbind("mousewheel", l) } })
});
loli = window.loli || (window.loli = {}); (function (c) { var d = window.loli || (window.loli = {}); d.delay = function (n, p, r, b, o) { var t = ""; var m = o || 200; var a = m - 50; var q; c(n)[p](function () { var e = c(this); var f = true; if (r) { var f = r.call(e) } if (!(f == false)) { q = setTimeout(function () { s.call(e) }, m); t = new Date().getTime() } }); function s() { if ((new Date().getTime() - t) >= a) { if (b) { b.call(this) } t = new Date().getTime() } } } })(jQuery); (function () {
    var g = window.loli || (window.loli = {}); var h = g; var e = h.util = h.util || {}; e.hashImgUrl = function (a) { var d = "[https:]*//d(\\d{1,2})\\."; var c = new RegExp(d, "i"); if (c.test(a)) { var b = e.toHash(a); return a.replace(c, "//d" + (b % 4 + 6) + ".") } else { return a } }; e.toHash = function (b) { var c = 0; for (var a = 0; a < b.length; a++) { if (b[a]) { c += b[a].charCodeAt() } } return c }; e.isIE = function () {
        var b = window.navigator.userAgent.toLowerCase();
        var a = /msie ([\d\.]+)/; if (a.test(b)) { var c = parseInt(a.exec(b)[1]); return c } return 0
    }; e.isIpad = function () { var a = window.navigator.userAgent; return a.indexOf("iPad") > 1 }; e.isSafari = function () { var d = window.navigator.userAgent.toLowerCase(); var c = /safari/i; var a = /chrome/i; var b = /Android/i; if (c.test(d) && !a.test(d) && !b.test(d)) { return true } return false }; e.isStorageSupported = function () { var c = e.isIE(); if ((c != 0 && c < 9) || e.isSafari()) { return false } try { if (window.localStorage) { localStorage.setItem("__testLocal", "1"); var a = localStorage.getItem("__testLocal"); return a } return false } catch (b) { return false } }; e.generateMixed = function (i) {
        var c = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; var a = ""; for (var b = 0; b < i; b++) {
            var d = Math.floor(Math.random() * 32);
            a += c[d]
        } return a
    }; e.isExistArray = function (b, c) { var a = false; for (var d = 0; d < b.length; d++) { if (b[d] == c) { a = true; break } } return a }; e.removeUrlHttp = function (b) { var a = /^[https:]*\/\/([\.\w]*)\.(yihaodian||yhd)[img]*\.com/; if (b && a.test(b)) { b = b.substring(b.indexOf("/")) } a = /^[https:]*\/\/([\.\w]*)\.360buyimg\.com/; if (b && a.test(b)) { b = b.substring(b.indexOf("/")) } return b }; e.resizeItemPic = function (d, k, l) { var a = k || 0; var b = l || 0; var c = /_\d+x\d+\.([a-zA-Z]+)$/; if (d && k && l) { if (c.test(d)) { d = d.replace(c, "_" + a + "x" + b + ".$1") } else { d = d.substring(0, d.lastIndexOf(".")) + "_" + a + "x" + b + d.substring(d.lastIndexOf(".")) } } if (!d) { d = "//img.yihaodianimg.com/front-homepage/global/images/defaultproduct.jpg" } return d }; e.resizePicJD = function (a, c, n) {
        if (a && c && n) {
            var m = ".360buyimg.com/test/s"; var b = c + "x" + n + "_"; var o = [10, 11, 12, 13, 14, 20, 30];
            var d = Math.ceil(Math.random() * 7); var p = "//img" + o[d - 1] + m + b; return p + a
        } else { return a }
    }; function f(a) { if (!a) { return true } for (var b in a) { return false } return true } e.url = {
        getParams: function (b) { b = $.trim(b); var a = this; var c = a.parseUrl(b); return c ? c.params : null }, appendParams: function (d, b) { var c = this; if (f(b)) { return d } var l = c.parseUrl(d); if (!l) { return d } var a = l.params; for (var k in b) { if (b.hasOwnProperty(k) && (b[k] != null && typeof b[k] !== "undefined" && $.trim(b[k]).length > 0)) { a[k] = b[k] } else { if (b.hasOwnProperty(k) && (b[k] == null || typeof b[k] === "undefined" || $.trim(b[k]) == "")) { delete a[k] } } } l.params = a; return c.toCusString(l) }, deleteParams: function (a, m) {
            var i = this; if (!m || m.length < 0) { return a } var d = i.parseUrl(a); if (!d) { return a } var c = d.params; for (var b = 0; b < m.length; b++) {
                var n = m[b]; if (c.hasOwnProperty(n)) {
                    delete c[n]
                }
            } d.params = c; return i.toCusString(d)
        }, parseUrl: function (B) { var E = ""; var b = ""; var D = ""; var x = {}; B = $.trim(B); if (B == "") { return null } var d = B.split("#"); var C = d[0]; if (d.length >= 2) { for (var y = 1, c = d.length; y < c; y++) { E += "#" + d[y] } } var F = C.indexOf("?"); var u = C.length; if (F > 0) { b = C.substring(0, F); D = C.substring(F + 1, u) } else { b = C } if (D) { var z = D.split("&"); for (var y = 0, c = z.length; y < c; y++) { var i = z[y].indexOf("="); if (i == -1) { continue } var a = z[y].substring(0, i); var w = z[y].substring(i + 1); x[a] = w } } var A = { loc: b, params: x, append: E }; return A }, toCusString: function (a) {
            var d = []; d.push(a.loc); var j = a.params; if (!f(j)) { d.push("?"); var c = 0; for (var b in j) { if (j.hasOwnProperty(b) && (j[b] != null && typeof j[b] !== "undefined" && $.trim(j[b]).length > 0)) { if (c) { d.push("&") } d.push(b + "=" + j[b]); c++ } } } if (a.append) { d.push(a.append) } return d.join("")
        }
    }; e.getYhdImgUrlBySize = function (a, n, c) { if (!a || !n || !c) { return a } var b = /\/s\d{1,}x\d{1,}_/; if (b.test(url)) { return a } try { var o = a.split("."); var d = o[2].split("/"); var p = d[2]; d[2] = ["s", n, "x", c, "_" + p].join(""); o[2] = d.join("/"); return o.join(".") } catch (m) { return a } }; e.getYhdImgUrlByPath = function (m, c, a, d, l) { if (!d || !c || !a) { return "" } if (l == 1) { return "//m.360buyimg.com/n1/s" + c + "x" + a + "_" + d } try { var b; m = m ? m : 0; switch (m % 5) { case 0: b = 10; break; case 1: b = 11; break; case 2: b = 12; break; case 3: b = 13; break; case 4: b = 14; break; default: b = 10 }return "//img" + b + ".360buyimg.com/n1/s" + c + "x" + a + "_" + d } catch (n) { return "" } }; e.globalFiterWords = function (b) {
        try {
            if (!SensitiveWords || !b) { return } var s = new Array(); var i = new Array(); var r, a = []; r = SensitiveWords.split(","); if (r.length > 0) {
                for (var d in r) {
                    a = r[d].split("="); var t = a[0]; if ($.inArray(t, s) < 0) {
                        s.push(t);
                        i[d] = a.length > 1 ? a[1] : ""
                    }
                }
            } for (var k in s) { var t = s[k]; var q = new RegExp(t, "gi"); b = b.replace(q, i[k]) }
        } catch (c) { } return b
    }
})(); (function (c) { var d = window.loli || (window.loli = {}); d.globalCheckLogin = function (g) { function b(e) { if (!jQuery.cookie("yihaodian_uid")) { e({ result: "0", userName: "" }); return } a(e) } function a(e) { var f = ((typeof URLPrefix.passport != "undefined") ? URLPrefix.passport : "https://passport.yhd.com") + "/publicPassport/isLogin.do?callback=?"; jQuery.ajax({ type: "get", url: f, dataType: "json", success: function (j) { h(e, j) }, error: function () { e({ result: "0", userName: "" }) } }) } function h(e, f) { if (f) { if (e) { e(f); return } } e({ result: "0", userName: "" }) } b(g) } })(jQuery); (function (c) {
    var d = function (a) {
        var b = a, f = { activeLoadTime: 2000, load: true, activeLoadNum: 1, hfix: 100, callback: null, attr: "lazyLoad_textarea", flushPrice: true, flushPriceAttr: "productid", indexLoad: false, scrollLoad: true };
        c.extend(f, b); this.param = f
    }; d.prototype = {
        constructor: d, doc: document, areaArray: [], lazyDom: function (b, h) { var j = this, i = j.param, a = b; if (h) { j.param = c.extend(i, h) } j.areaArray = j._getJqueryDomArray(a, i); if (i.indexLoad) { j._domScrollLoad(j.areaArray, i) } if (i.scrollLoad) { j._loadScrollDom(function () { if (j.areaArray.length == 0) { return } j._domScrollLoad(j.areaArray, i) }) } if (i.load) { j._loadActiveDom(j.areaArray, i) } }, _loadActiveDom: function (j, m) { var b = this, n = m, a = n.activeLoadTime, k = j; var l = setInterval(function () { var e = k.length; if (e == 0) { clearInterval(l); return } b._domActiveLoad(k, n) }, a) }, _loadScrollDom: function (a) { loli.scroll(function () { a() }, 50) }, _domScrollLoad: function (m, k) {
            var b = this, k = b.param, n = []; for (var a = 0, i = m.length; a < i; a++) { var l = b._getJqueryDom(m[a]); if (b.isInCurrScreen(l)) { b._rendDom(l, k) } else { n.push(l) } } b.areaArray = n
        }, _domActiveLoad: function (m, o) { var b = this, p = o, l = m, a = l.length, i = Math.min(p.activeLoadNum, a); for (var n = 0; n < i; n++) { b._rendDom(b._getJqueryDom(l.shift()), p) } }, _rendDom: function (a, q) { var l = a, o = q, p = o.attr, m = l.attr(p), b = c("#" + m), n = o.flushPrice, r = o.flushPriceAttr; if (b.size() > 0) { l.html(b.val()) } l.removeAttr(p); if (n) { l.lazyPrice({ attr: r, oneOffLoad: true }) } if (o.callback) { o.callback.call(l) } }, isInCurrScreen: function (o) { var m = this, l = o, r = m.doc, b = r.documentElement, n = m.param, q = n.hfix, p = Math.max(b.scrollTop, r.body.scrollTop), a = b.clientHeight + p; if (l) { return (l.offset().top < a + q) && (l.offset().top > p - q) } return false }, _getJqueryDomArray: function (g, h) {
            var b = [], a = h.attr; if (g instanceof c) { b = g.find("[" + a + "]").get() } else { if (c.isArray(g)) { b = g; return b } else { g = c(g); b = g.find("[" + a + "]").get() } } if (b.length == 0) {
                if (g.attr(a)) {
                    b.push(g)
                }
            } return b
        }, _getJqueryDom: function (a) { if (!a) { return a } if (a instanceof c) { return a } return c(a) }
    }; c.fn.extend({ lazyDom: function (a) { var b = new d(); return b.lazyDom(this, a) } })
})(jQuery); (function (f) {
    var d = function (a) { var b = a, c = { lazyImg: { ltime: "2000", lnum: "5", load: true, indexLoad: false, scrollLoad: true, attr: "original", wideAttr: null, hfix: 100 } }; f.extend(c, b); this.param = c }; d.prototype = {
        constructor: d, isBusy: false, doc: document, imgArray: [], lazyImg: function (l, b) {
            var a = this, j = a.param.lazyImg, c, k = l; if (b) { a.param.lazyImg = f.extend(j, b) } if (k instanceof f) { c = k } else { if (f.isArray(k)) { k = f(k.join(",")) } else { k = f(k) || f("body") } } if (j.wideAttr) { if ("original" == j.attr) { a.imgArray = k.find("img[" + j.attr + "],img[" + j.wideAttr + "]") } else { a.imgArray = k.find("img[" + j.attr + "],img[" + j.wideAttr + "],img[original]") } } else {
                if ("original" == j.attr) {
                a.imgArray = k.find("img[" + j.attr + "]")
                } else { a.imgArray = k.find("img[" + j.attr + "],img[original]") }
            } if (j.indexLoad) { a._lazyImg(a.imgArray, j) } if (j.scrollLoad) { a._iniLazy(function () { if (a.imgArray.length == 0) { return c } a._lazyImg(a.imgArray, j) }) } if (j.load) { a._loadImg(k) } return l
        }, _loadImg: function (j) { var l = this, a = l.param.lazyImg, b = a.attr, c = a.ltime, k = a.lnum; (function (g, q, i, p, r) { var h = setInterval(function () { if (g.isBusy) { return false } var n = g.imgArray; var m = n.length; if (m > r) { g._imgLoad(n, 0, r, i) } else { if (m > 0) { g._imgLoad(n, 0, m, i) } else { clearInterval(h) } } }, p) })(l, j, b, c, k) }, _lazyImg: function (c, m) { var o = m.attr, p = c.length, a = this, l = 0, n = 1; a.isBusy = true; var b = a._pageTop(); a._imgLoad(a.imgArray, l, p, o, b, m.hfix); a.isBusy = false }, _imgLoad: function (s, q, b, u, c, a) {
            var i = this; if (c) {
                for (var t = q; t < b; t++) {
                    var r = f(s[t]); var v = jQuery(window).height() + a; if (r.offset().top < (c + a) && (c - r.offset().top) < v) {
                        i._renderImg(r, u);
                        delete s[t]
                    }
                }
            } else { for (var t = q; t < b; t++) { var r = f(s[t]); i._renderImg(r, u); delete s[t] } } var p = new Array(); for (var t = 0; t < s.length; t++) { if (s[t]) { p.push(s[t]) } } i.imgArray = p
        }, _renderImg: function (j) {
            var i = this.param.lazyImg; var a = i.wideAttr; var b = i.attr; var c = typeof isWidescreen != "undefined" ? isWidescreen : false; if (c) { if (a && j.attr(a)) { j.attr("src", loli.webp(j.attr(a), j.attr("data-nwp"))).attr("data-imgattr", a) } else { if (b && j.attr(b)) { j.attr("src", loli.webp(j.attr(b), j.attr("data-nwp"))).attr("data-imgattr", b) } else { if (j.attr("original")) { j.attr("src", loli.webp(j.attr("original"), j.attr("data-nwp"))).attr("data-imgattr", "original") } } } } else {
                if (b && j.attr(b)) { j.attr("src", loli.webp(j.attr(b), j.attr("data-nwp"))).attr("data-imgattr", b) } else {
                    if (a && j.attr(a)) {
                        j.attr("src", loli.webp(j.attr(a), j.attr("data-nwp"))).attr("data-imgattr", a)
                    } else { if (j.attr("original")) { j.attr("src", loli.webp(j.attr("original"), j.attr("data-nwp"))).attr("data-imgattr", "original") } }
                }
            } j.removeAttr(a).removeAttr(b).removeAttr("original")
        }, _iniLazy: function (b) { var a = this; loli.delay(window, "scroll", function () { if (!a.isBusy) { a.isBusy = true; return true } else { return false } }, function () { b() }, 50) }, _pageTop: function () { var a = this, b = a.doc, c = b.documentElement; return c.clientHeight + Math.max(c.scrollTop, b.body.scrollTop) }, _hashImgUrl: function (a) { if (loli && loli.util) { return loli.util.hashImgUrl(a) } return a }
    }; var e = new d(); f.fn.extend({ lazyImg: function (a) { var b = new d(); return b.lazyImg(this, a) } })
})(jQuery); (function () {
    function b(a) {
    this.option = { container: null, content: null, trigger: null, pageButton: [], steps: 1, effect: "visible", autoPlay: false, interval: 3000, activeClass: "on", speed: 300, eventType: "mouseover", delay: 0, index: 0 };
        $.extend(this.option, a); this.box = $(this.option.container); if (this.box.length == 0) { return false } this.sprite = this.box.find(this.option.content); if (this.sprite.length == 0) { return false } this.trig = this.box.find(this.option.trigger).children(); this.btnLast = this.box.find(this.option.pageButton[0]); this.btnNext = this.box.find(this.option.pageButton[1]); this.items = this.sprite.children(); if (this.items.length == 0) { return false } this.total = this.items.length; if (this.total <= this.option.steps) { return false } this.page = Math.ceil(this.total / this.option.steps); this.width = this.items.eq(0).outerWidth(true); this.height = this.items.eq(0).outerHeight(true); this.index = this.option.index; this.timer = 0; this.handlers = {}; this.init()
    } b.prototype = {
        init: function () { this.initStyle(); this.cutover(0); this.bindUI(); this.autoPlay() }, on: function (d, a) {
            if (typeof this.handlers[d] == "undefined") {
            this.handlers[d] = []
            } this.handlers[d].push(a); return this
        }, fire: function (h, g) { if (this.handlers[h] instanceof Array) { var j = this.handlers[h]; for (var i = 0, a = j.length; i < a; i++) { j[i](g) } } }, initStyle: function () {
            var a = function (c) { for (var d = 0; d < c.option.steps; d++) { c.items.eq(c.total - (d + 1)).clone().prependTo(c.sprite); c.items.eq(d).clone().appendTo(c.sprite) } }; switch (this.option.effect) { case "scrollx": a(this); this.sprite.css({ width: this.sprite.children().length * this.width, left: -this.option.steps * this.width }); this.sprite.children().css("float", "left"); break; case "scrolly": a(this); this.sprite.css({ top: -this.option.steps * this.height }); break; case "fade": this.items.css({ position: "absolute", zIndex: 0 }).eq(this.index).css({ zIndex: 1 }); break; case "visible": this.items.css({ display: "none" }).eq(this.index).css({ display: "block" }); break }var e = this;
            var f = setTimeout(function () { clearTimeout(f); e.fire("init") }, 30)
        }, cutover: function (i) { var h = (i == null) ? this.option.speed : 0; var g = this.index != this.page ? this.index : 0; this.trig.eq(g).addClass(this.option.activeClass).siblings().removeClass(this.option.activeClass); switch (this.option.effect) { case "visible": this.items.css({ display: "none" }).eq(g).css({ display: "block" }); break; case "fade": this.items.css({ position: "absolute", zIndex: 0 }).fadeOut(h); this.items.eq(g).css({ zIndex: 1 }).fadeIn(h); break; case "scrollx": var a = this.width * this.option.steps; this.sprite.stop().animate({ left: -a * this.index - a }, h); break; case "scrolly": var j = this.height * this.option.steps; this.sprite.stop().animate({ top: -j * this.index - j }, h); break }this.fire("cutover", g) }, bindUI: function () {
            var e = this; var f = 0; this.trig.bind(this.option.eventType, function () {
                var c = this;
                if (e.option.eventType == "mouseover" || e.option.eventType == "mouseenter") { if (e.index == $(c).index()) { return } clearTimeout(f); f = setTimeout(function () { e.index = $(c).index(); e.cutover(); clearTimeout(f) }, e.option.delay) } else { e.index = $(this).index(); e.cutover() }
            }); this.btnLast.click(function () { e.lastPage() }); this.btnNext.click(function () { e.nextPage() }); function a(p, m, o, c) {
                var q = 0, r = 0, n = 0, d = 0; p.off("touchstart touchend").on({
                    touchstart: function (g) { var h = g.originalEvent.changedTouches[0]; q = h.pageX; r = h.pageY; if (c) { c(q, r) } }, touchmove: function (g) { var h = g.originalEvent.changedTouches[0]; n = h.pageX; d = h.pageY; if (Math.abs(n - q) > Math.abs(d - r)) { if (o) { o(n - q, d - r) } g.preventDefault() } }, touchend: function (g) {
                        var h = g.originalEvent.changedTouches[0]; n = h.pageX; d = h.pageY; if (Math.abs(n - q) > Math.abs(d - r)) {
                            if (n - q > 0) {
                                if (m) {
                                    m("right")
                                }
                            } else { m("left") }
                        } else { if (d - r > 0) { m("down") } else { m("up") } }
                    }
                })
            } a(this.box, function (c) { if (c == "left") { e.nextPage(); clearInterval(e.timer); e.autoPlay() } if (c == "right") { e.lastPage(); clearInterval(e.timer); e.autoPlay() } }); this.box.bind({ mouseenter: function () { e.btnLast.show(); e.btnNext.show(); clearInterval(e.timer) }, mouseleave: function () { e.btnLast.hide(); e.btnNext.hide(); e.autoPlay() } })
        }, lastPage: function () { this.index--; if (this.index < -1) { this.index = this.page - 1; this.cutover(0); this.index = this.page - 2 } this.cutover() }, nextPage: function () { this.index++; if (this.index > this.page) { this.index = 0; this.cutover(0); this.index = 1 } this.cutover() }, autoPlay: function () { var a = this; if (!this.option.autoPlay) { return false } clearInterval(this.timer); this.timer = setInterval(function () { a.nextPage() }, this.option.interval) }
    }; window.Switchable = b
})(); (function () {
    function h(a) { if (a && typeof (a) == "string") { return a.replace(/(^\s*)|(\s*$)/g, "") } else { return a } } function g() { if (typeof (localStorage) == "undefined") { return false } var b = localStorage.getItem("webp"); if (b) { return true } var a = document.createElement("canvas"); if (!!(a.getContext && a.getContext("2d"))) { var c = a.toDataURL("image/webp").indexOf("data:image/webp") == 0; if (c) { localStorage.setItem("webp", true) } return c } else { return false } } var i = false; try { i = g() } catch (j) { } function f(c, a) { if (typeof (__cannotWebp) != "undefined" && __cannotWebp) { return c } if (a) { return c } if (!i || !c) { return c } c = h(c); var b = /^[https:]*\/\/d(\d+).(yihaodian||yhd)[img]*.com/; if (c.search(b) == -1) { return c } var d = c.split("."); if (d.length > 1) { if (d[d.length - 1].toLowerCase() == "gif") { return c } d[d.length - 1] = "webp" } return d.join(".") } loli.webp = f
})(); (function () {
    var p = window.loli || (window.loli = {}); var v = "localStorage", t = "sessionStorage", z = {}, w = {}; z.set = function (b, a) { }; z.get = function (a) { }; z.remove = function (a) { }; z.clear = function () { }; w.set = function (b, a) { }; w.get = function (a) { }; w.remove = function (a) { }; w.clear = function () { }; function y(c) { try { if (c in window && window[c]) { localStorage.setItem("__testLocal", "1"); var a = localStorage.getItem("__testLocal"); return a } return false } catch (b) { return false } } function u(c, b) { var a = window[c]; b.set = function (e, d) { if (d === undefined) { return a.remove(e) } a.setItem(e, d); return d }; b.get = function (d) { return a.getItem(d) }; b.remove = function (d) { a.removeItem(d) }; b.clear = function () { a.clear() } } if (y(v)) { u(v, z) } if (y(t)) { u(t, w) } var q = function () {
        var b = false; var c = document.domain; var a = /([^\.]*)\.yhd\.com/; if (a.test(c)) {
            var d = a.exec(c)[1];
            if (d == "www") { b = true }
        } return b
    }; var n = function () { var b = window.navigator.userAgent.toLowerCase(); var a = /msie ([\d\.]+)/; if (a.test(b)) { var c = parseInt(a.exec(b)[1]); return c } return 0 }; var r = function () { var d = window.navigator.userAgent.toLowerCase(); var c = /safari/i; var a = /chrome/i; var b = /Android/i; if (c.test(d) && !a.test(d) && !b.test(d)) { return true } return false }; var x = function () { var a = new Date(); return (a.getYear() + 1900) + "" + (a.getMonth() + 1) + "" + a.getDate() }; var s = function (j, k, f, m) {
        var i = f || function () { }; var c = (m && m == "session") ? w : z; if (q()) { var g = c.set(j, k); i({ status: 1, key: j, value: g }) } else {
            if (r() && m != "session") {
                var h = /^[%,_:~\!\*\(\)\'\-\.\|\w]+$/; if (k != null) { if (h.test(k)) { $.cookie(j, k, { domain: "yhd.com", path: "/", expires: 30 }) } else { $.cookie(j, encodeURIComponent(k), { domain: "yhd.com", path: "/", expires: 30 }) } } i({ status: 1, key: j, value: k });
                return
            } if (!window.postMessage || !window.addEventListener) { i({ status: 0, key: j, value: null }); return } var a = "globalLocalStorageAdaptorForSet"; var e = $("#" + a); if (e.size() == 0) { var b = document.createElement("iframe"); b.setAttribute("id", a); b.setAttribute("style", "display:none"); b.setAttribute("src", window.location.protocol + "//www.yhd.com/html/setLocalStorage.html?v=" + x()); document.body.appendChild(b); e = $("#" + a) } var l = function (E) { var D = window.location.protocol + "//www.yhd.com"; var F = { key: j, value: k, type: m, op: "storage" }; if (n() == 9) { F = '{"key":"' + j + '", "value":"' + k + '", "type":"' + m + '", "op":"storage"}' } E.postMessage(F, D); i({ status: 1, key: j, value: k }) }; if (e.attr("loaded")) { var d = e.get(0).contentWindow; l(d) } else { e.load(function () { $(this).attr("loaded", "1"); var B = $(this).get(0).contentWindow; l(B) }) }
        }
    }; var o = function (h, f, k) {
        var e = f || function () { };
        var a = (k && k == "session") ? w : z; if (q()) { var g = a.get(h); e({ status: 1, key: h, value: g }) } else {
            if (r() && k != "session") { var g = $.cookie(h); if (g !== null) { g = decodeURIComponent(g) } e({ status: 1, key: h, value: g }); return } if (!window.postMessage || !window.addEventListener) { e({ status: 0, key: h, value: null }); return } var l = window.yhd_storage_get_callback || (window.yhd_storage_get_callback = []); l.push(e); var B = l.length - 1; var j = "globalLocalStorageAdaptorForGet"; var d = $("#" + j); if (d.size() == 0) { var b = document.createElement("iframe"); b.setAttribute("id", j); b.setAttribute("style", "display:none"); b.setAttribute("src", window.location.protocol + "//www.yhd.com/html/getLocalStorage.html?v=" + x()); document.body.appendChild(b); d = $("#" + j) } var i = function (F) {
                var A = window.location.protocol + "//www.yhd.com"; var H = window.location.protocol + "//" + window.location.host;
                var G = { key: h, host: H, version: B, type: k, op: "storage" }; if (n() == 9) { G = '{"key":"' + h + '", "host":"' + H + '", "version":"' + B + '", "type":"' + k + '", "op":"storage"}' } F.postMessage(G, A)
            }; if (d.attr("loaded")) { var c = d.get(0).contentWindow; i(c) } else { d.load(function () { $(this).attr("loaded", "1"); var A = $(this).get(0).contentWindow; i(A) }) } var m = function (I) { var J = /^http[s]?:\/\/([\.\w]*)\.yhd\.com/i; var A = /^http[s]?:\/\/([\.\w]*)\.yihaodian\.com\.hk/i; if (J.test(I.origin) || A.test(I.origin)) { var H = I.data; if (H) { if (typeof H == "string") { H = $.parseJSON(H) } if (H.op != "storage") { return } var G = l[H.version]; if (G) { G({ status: 1, key: H.key, value: H.value }) } else { e({ status: 1, key: H.key, value: H.value }) } } } }; if (!window.yhd_storage_get_handler) { window.addEventListener("message", m); window.yhd_storage_get_handler = m }
        }
    }; z.isRoot = q; z.isIE = n; z.setFromRoot = function (c, a, b) {
        s(c, a, b, "local")
    }; z.getFromRoot = function (b, a) { o(b, a, "local") }; w.setFromRoot = function (c, a, b) { s(c, a, b, "session") }; w.getFromRoot = function (b, a) { o(b, a, "session") }; p.yhdStore = z; p.yhdSessionStore = w
})(); var initMenu = (function () {
    function b(a, d) { return (d.y - a.y) / (d.x - a.x) } return function (E) {
        var D = $(this), t = null, C = [], F = null, A = null, a = $.extend({ rowSelector: "> li", submenuSelector: "*", submenuDirection: "right", tolerance: 75, enter: $.noop, exit: $.noop, activate: $.noop, deactivate: $.noop, exitMenu: $.noop }, E); if (E.isDestroy) { D.find(a.rowSelector).unbind(); $(document).unbind("mousemove") } else {
            var B = 3, s = 300; var x = function (c) { C.push({ x: c.pageX, y: c.pageY }); if (C.length > B) { C.shift() } }; var G = function () { if (A) { clearTimeout(A) } if (a.exitMenu(this)) { if (t) { a.deactivate.call(t) } t = null } }; var v = function () {
                if (A) { clearTimeout(A) } a.enter(this); z(this)
            }, y = function () { a.exit(this) }; var u = function () { w(this) }; var w = function (c) { if (c == t) { return } if (t) { a.deactivate.call(t) } a.activate.call(c); t = c }; var z = function (c) { var d = H(); if (d) { A = setTimeout(function () { z(c) }, d) } else { w(c) } }; var H = function () {
                if (!t || !$(t).is(a.submenuSelector)) { return 0 } var g = D.offset(), o = { x: g.left, y: g.top - a.tolerance }, m = { x: g.left + D.outerWidth(), y: o.y }, k = { x: g.left, y: g.top + D.outerHeight() + a.tolerance }, f = { x: g.left + D.outerWidth(), y: k.y }, e = C[C.length - 1], n = C[0]; if (!e) { return 0 } if (!n) { n = e } if (n.x < g.left || n.x > f.x || n.y < g.top || n.y > f.y) { return 0 } if (F && e.x == F.x && e.y == F.y) { return 0 } var c = m, j = f; if (a.submenuDirection == "left") { c = k; j = o } else { if (a.submenuDirection == "below") { c = f; j = k } else { if (a.submenuDirection == "above") { c = o; j = m } } } var i = b(e, c), d = b(e, j), l = b(n, c), h = b(n, j); if (i < l && d > h) { F = e; return s } F = null;
                return 0
            }; D.mouseleave(G).find(a.rowSelector).unbind().mouseenter(v).mouseleave(y).click(u); $(document).mousemove(x); D.find(a.rowSelector).one("mousemove", v)
        }
    }
})(); $.fn.yhdMenu = function (b) { return this.each(function () { initMenu.call(this, b) }) }; define("header", function () {
    var b = {}; b.ieLower = "undefined" == typeof (document.body.style.maxHeight); b.isNarrowscreen = screen.width < 1228; b.maxHeight = function (a, h) { if (b.ieLower) { var f = $(a).height(); var g = parseInt(h); if (f > g) { $(a).height(g) } } }; b.maxWidth = function (a, h) { if (b.ieLower) { var f = $(a).width(); var g = parseInt(h); if (f > g) { $(a).width(g) } } }; b.topbarHover = function () {
        $(".hd_topbar_right").on("mouseenter", ".hd_has_child", function () { var a = $(this); a.addClass("hd_cur") }); $(".hd_topbar_right").on("mouseleave", ".hd_has_child", function () {
            var a = $(this); a.removeClass("hd_cur")
        })
    }; b.privilegeSlide = function () { b.leftRightSlide(".hd_top_bar .hd_privilege_wrap", 1, 4, 300) }; b.leftRightSlide = function (a, u, t, q) { var n = $(a), o = n.find(".hd_privilege_list"), p = o.children(), x = u, w = p.length, r = p.outerWidth(true); if (w > t) { n.addClass("hd_privilege_slide"); p.slice(w - 1, w).prependTo(o); o.css({ left: -r }); function v() { o.stop(true, true).animate({ marginLeft: -r }, q, function () { o.css({ marginLeft: 0 }).children().slice(0, u).appendTo(o) }) } function s() { o.stop(true, true).animate({ marginLeft: r }, q, function () { o.css({ marginLeft: 0 }).children().slice(w - 1, w).prependTo(o) }) } n.on("click", ".next_btn", function () { v() }); n.on("click", ".prev_btn", function () { s() }) } }; b.singIn = function () {
        $(".mod_personal_center").on("click", ".sign_in", function () {
            var a = $(this); if (!a.hasClass("already_sign_in")) {
                a.addClass("already_sign_in");
                a.find("a").text("å·²ç­¾åˆ°"); var k = $(".gold_coin").find(".add_coin"); $("img", k).removeAttr("src").attr("src", "images/add_coin.gif"); k.show(); var l = $(".gold_coin").find("em"); var m = parseInt(l.text()); var j = 6; var i = 1; var n = setInterval(function () { if (i < j) { l.text(m + i); i++ } else { clearInterval(n); var c = setTimeout(function () { $(".add_coin").hide() }, 500) } }, 120)
            }
        })
    }; b.modAreaSelect = function () {
        $(".yhd_area_select").each(function () {
            var l = this; l.isOpen = false; var p = $(this).find(".yhd_address"); var q = $(this).find(".yhd_tab_detail"); var a = $(this).find(".yhd_area_tab span"); var r = $(this).find(".yhd_area_box .yhd_item"); var m = $(this).find(".yhd_val_text"); var t = { a: a.eq(0).attr("data-val") || "è¯·é€‰æ‹©çœä»½", b: a.eq(1).attr("data-val") || "è¯·é€‰æ‹©å¸‚", c: a.eq(2).attr("data-val") || "è¯·é€‰æ‹©åŒº" }; p.click(function (c) {
                var d = $(".hd_cart_show .hd_cart_scrollwrap").outerHeight();
                if (d > $(".hd_cart_list").height() + $(".hd_area_wrap").outerHeight()) { $(".yhd_tab_detail", ".hd_cart_show").css("width", "334px") } else { $(".yhd_tab_detail", ".hd_cart_show").css("width", "317px") } if (!$(this).hasClass("select")) { $(".hd_cart_show .hd_cart_scrollwrap").css("position", "static"); $(this).addClass("select"); q.slideDown(); $(".hd_area_mask").show(); s(0); l.isOpen = true; $(".hd_area_mask,.hd_tab_detail").mousewheel(function (f, e) { f.preventDefault() }) } else { $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative"); $(this).removeClass("select"); q.slideUp(); $(".hd_area_mask").hide(); l.isOpen = false }
            }); $(document).click(function (c) {
                if (!l.isOpen) { return } var d = $(c.target); if (d.parents(".yhd_area_select").length == 0 || d.is(".yhd_close_btn")) {
                    $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative");
                    p.removeClass("select"); q.slideUp(); $(".hd_area_mask").hide(); l.isOpen = false; $(l).css({ position: "relative", top: 0 })
                }
            }); a.click(function () { var c = $(this).index(); s(c) }); $(this).click(function (c) { var d = $(c.target); if (d.is("a")) { var e = d.parents(".yhd_item"); if (e.hasClass("yhd_first_area")) { t.a = d.attr("data-val"); s(1) } if (e.hasClass("yhd_second_area")) { t.b = d.attr("data-val"); s(2) } if (e.hasClass("yhd_third_area")) { t.c = d.attr("data-val"); o(); $(l).css({ position: "relative", top: 0 }); $(l).find(".yhd_address").removeClass("select") } n(); e.find("dd").removeClass("yhd_on"); d.addClass("yhd_on") } }); var s = function (d, e, c) { a.eq(d).addClass("yhd_on").siblings().removeClass("yhd_on"); r.hide().eq(d).show() }; var o = function () {
                $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative"); p.removeClass("select"); q.slideUp();
                $(".hd_area_mask").hide(); var c = t.a + t.b + t.c; m.html(c); n()
            }; var n = function () { a.eq(0).attr("data-val", t.a).find("em").html(t.a); a.eq(1).attr("data-val", t.b).find("em").html(t.b); a.eq(2).attr("data-val", t.c).find("em").html(t.c) }; o()
        })
    }; b.channelHeader = function () { if ($(".hd_channel_allsort").length > 0) { $(".hd_channel_allsort").hover(function () { $(this).addClass("hd_ch_allsort_show") }, function () { $(this).removeClass("hd_ch_allsort_show") }); $(".hd_ch_allsort li").hover(function () { $(this).addClass("cur") }, function () { $(this).removeClass("cur") }) } }; b.commonHeader = function () {
        if ($(".hd_cm_global").length > 0 && $(".hd_cm_wrap").length > 0) {
            $(".hd_cm_allsort_wrap").hover(function () { $(this).addClass("hd_cm_allsort_show") }, function () { $(this).removeClass("hd_cm_allsort_show") }); $(".hd_cm_allsort li").hover(function () {
                $(this).addClass("cur")
            }, function () { $(this).removeClass("cur") }); var a = $(".hd_cm_wrap").offset().top; $(window).scroll(function () { var d = $(this).scrollTop(); if (d > a) { $(".hd_cm_wrap").addClass("hd_cm_fixed"); if ($(".headerNav_box").length == 0) { $(".hd_header_nav").after('<p class="headerNav_box"></p>') } } else { $(".headerNav_box").remove(); $(".hd_cm_wrap").removeClass("hd_cm_fixed") } })
        }
    }; b.navFixed = function () {
        if (!$(".hd_header").hasClass("hd_channel_header") && !$(".hd_header").hasClass("hd_city_header") && !$(".hd_header").hasClass("hd_cm_global") && !$(".hd_header").hasClass("hd_shop_global") && !$(".hd_header").hasClass("hd_brand_global")) {
            if (!$(".mod_seckill").offset()) { return } var a = $(".mod_seckill").offset().top; var d = $(".hd_search_form"); $(window).scroll(function () {
                var c = $(this).scrollTop(); if (c > a) {
                    if (!d.hasClass("hd_search_fixed")) {
                        $(".hd_search_tips_result").hide();
                        $(".hd_head_search").css("z-index", "950"); d.css("top", "-70px"); d.addClass("hd_search_fixed"); $(".hd_search_fixed").animate({ top: 0 }, 500, function () { })
                    }
                } else { d.removeClass("hd_search_fixed"); $(".hd_head_search").css("z-index", "501") }
            })
        }
    }; b.categoryMenuDelay = function () { var d; var a = $("#J_allsort"); $("#J_allsort").hover(function () { d = setTimeout(function () { a.yhdMenu({ isDestroy: false, activate: function (c) { $(this).addClass("cur") }, deactivate: function (c) { $(this).removeClass("cur") }, exitMenu: function () { return true } }) }, 200) }, function () { clearTimeout(d); a.yhdMenu({ isDestroy: true }) }) }; b.searchFocus = function (a) {
        $(a).focus(function () { $(this).parent("div").find("label").css({ color: "#CCCCCC" }) }); $(a).keydown(function () { $(this).parent("div").find("label").hide() }); $(a).blur(function () {
            if ($(this).val() == "") {
                $(this).parents("div").find("label").show().css({ color: "#aaaaaa" }).text("")
            } if (a == "#fix_keyword") { $(this).removeClass("focus_ipt") }
        })
    }, b.liObj = { keyIndex: -1 }; b.searchListHover = function (g) {
        var j = $("#searchSuggest ul"); var a = $("#searchSuggest ul .ss_item"); var i, h; $("a.s_cart_btn").hide(); $(this).find("hd_property_list"); a.on("mouseenter", function () { var d = a.index(this); var c = $(this); clearTimeout(h); i = setTimeout(function () { j.find(".select").removeClass("select_haslist select"); j.find(".select_haslist").removeClass("select_haslist select"); if (c.hasClass("haslist")) { c.addClass("select_haslist"); b.maxHeight(".hd_total_sort .hd_property_list", "178") } else { c.addClass("select") } g.keyIndex = d }, 200) }); a.on("mouseleave", function () { var c = $(this); clearTimeout(i); h = setTimeout(function () { c.removeClass("select select_haslist") }, 100) }); $(".choose_list dd").on("mouseover", function () {
            $(this).find(".s_cart_btn").show();
            return false
        }); $(".choose_list dd").on("mouseout", function () { $(this).find(".s_cart_btn").hide(); return false })
    }; b.keyAction = function (a) { $(".hd_search_ipt").keydown(function (n) { var i = $("#searchSuggest ul"); var j = $("#searchSuggest ul .ss_item"); var k = j.length; var l = a.keyIndex; if (n.keyCode == "40") { l++; if (l >= k) { l = 0 } } else { if (n.keyCode == "38") { l-- } } if (n.keyCode == "40" || n.keyCode == "38") { a.keyIndex = l; var m = $(".hd_search_tips_result > ul > li").eq(l); i.find(".select").removeClass("select_haslist select"); i.find(".select_haslist").removeClass("select_haslist select"); if (m.hasClass("haslist")) { m.addClass("select_haslist"); b.maxHeight(".hd_total_sort .hd_property_list", "178") } else { m.addClass("select") } $("#keyword").val(m.text()) } else { $(".hd_search_tips_result > ul > li").unbind("mouseover") } }) }; b.searchBoxShowHide = function (f, a) {
        var a = $(a);
        var e = $(f).parents(a).find(".hd_search_tips_result"); $(f).focus(function () { if (!a.hasClass("hd_search_fixed")) { $(e).show(); $(e).find(".hd_search_history_new").show() } $("#searchSuggest ul").css("height", ""); return false }); $(f).keyup(function (c) { if (!a.hasClass("hd_search_fixed")) { $(e).find(".hd_search_history_new").hide(); $(e).find("ul").show() } }); $(a).bind("mouseleave", function () { if (!a.hasClass("hd_search_fixed")) { $(e).find(".hd_search_history_new").hide(); $(e).find("ul").hide() } })
    }; b.searchListClick = function (h) { var a = $("#searchSuggest ul li.ss_item"); var f = b.liObj.keyIndex; var g = $(".hd_search_tips_result > ul > li.ss_item"); g.bind("click", function () { $(h).val($(this).text()); searchMe($(h), "0", "0") }) }; b.lamuShow = function () {
        var j = $(".big_topbanner"), g = $(".small_topbanner"), h = $(".mod_topbanner_wrap");
        var a, i; h.hover(function () { clearTimeout(i); a = setTimeout(function () { if (!j.is(":animated") && !g.is(":animated") && j.length > 0) { g.slideUp(); j.slideDown(); if (/^#[a-fA-F0-9]{1,6}$/.test(j.attr("data-bgColor"))) { h.css("background-color", j.attr("data-bgColor")) } } }, 300) }, function () { clearTimeout(a); i = setTimeout(function () { if (!j.is(":animated") && !g.is(":animated") && j.length > 0) { g.slideDown(); j.slideUp(); if (/^#[a-fA-F0-9]{1,6}$/.test(g.attr("data-bgColor"))) { h.css("background-color", g.attr("data-bgColor")) } } }, 300) }); h.on("click", ".close_btn", function () { h.slideUp() })
    }; b.noticeShow = function () {
        if ($("li", ".hd_header_notice").length > 1) {
            var a; $(".hd_header_notice").hover(function () { clearInterval(a) }, function () {
                a = setInterval(function () {
                    var e = $(".hd_header_notice ul:first"); var f = e.find("li:first").height(); e.animate({ marginTop: -f + "px" }, 500, function () {
                        e.css({ marginTop: 0 }).find("li:first").appendTo(e)
                    })
                }, 5000)
            }).trigger("mouseleave")
        } $(".hd_header_wrap").on("click", ".hd_notice_close", function () { $(".hd_header_notice").hide() })
    }; b.verticalPersonalCenter = function () { try { var j = $(".mod_personal_center"); if (j.length < 1 || j.css("display") == "none") { return } var h = $(".first_screen_main"); if (h.length < 1) { return } var l = h.outerHeight(); var a = j.outerHeight(); var i = parseInt((l - a) / 2 + 12.5); if (i > 0) { j.css("top", i + "px") } $(".vip_item_text").each(function (f, d) { d = $(d); var c = d.text(); var e = new RegExp("[\\u4E00-\\u9FA5]+", "g"); if (e.test(c)) { if (c.length > 4) { d.text(c.slice(0, 4)) } } else { if (c.length > 8) { d.text(c.slice(0, 8)) } } }) } catch (k) { } }; b.jsAdPopClose = function () { $(".advertisement_wrap").on("click", ".close_btn", function () { $(this).parents(".advertisement_wrap").fadeOut() }) }; b.cJsMenu = function () {
        if ($(".home_menu_warp")) {
            var g = $(".home_menu_warp"), a = g.find(".h_menu_ul"), i = g.find(".home_drop_box"), h = g.find(".h_drop_ul");
            a.children("li").on("mouseover", function () { var c = $(this), d = c.attr("data-tip"); c.addClass("cur").siblings().removeClass("cur"); if (d !== undefined) { i.show(); h.show().find("li[data-tip=" + d + "]").stop(true, true).fadeIn().siblings().hide() } else { i.hide(); h.hide().find("li").hide() } }); g.on("mouseleave", j); function j() { a.children("li").removeClass("cur"); h.hide().find("li").hide() }
        }
    }; b.shopDsr = function () { if ($(".hd_shop_global")) { $(".hd_shop_dsr").hover(function () { $(this).addClass("hd_dsr_show") }, function () { $(this).removeClass("hd_dsr_show") }); $(".hd_shop_phone_wrap").on("mouseenter", function () { $(this).addClass("hd_code_show") }); $(".hd_shop_phone_wrap").on("mouseleave", function () { $(this).removeClass("hd_code_show") }) } }; b.brandHeader = function () {
        if ($(".hd_brand_global")) {
            $(".hd_brand_global").on("mouseenter", ".hd_attent", function () {
                $(this).find("span").text("15004")
            }); $(".hd_brand_global").on("mouseleave", ".hd_attent", function () { if ($(this).hasClass("hd_attented")) { $(this).find("span").text("å·²å…³æ³¨") } else { $(this).find("span").text("å…³æ³¨") } }); $(".hd_brand_global").on("click", ".hd_attent", function () { if ($(this).hasClass("hd_attented")) { $(this).removeClass("hd_attented").find("span").text("å…³æ³¨") } else { $(this).addClass("hd_attented").find("span").text("å·²å…³æ³¨") } })
        }
    }; b.init = function () { b.topbarHover(); b.privilegeSlide(); b.maxWidth(".hd_login_name", "156"); b.singIn(); b.modAreaSelect(); b.channelHeader(); b.commonHeader(); b.navFixed(); b.categoryMenuDelay(); b.search(); b.lamuShow(); b.jsAdPopClose(); b.cJsMenu(); b.maxWidth(".hd_shop_info .hd_shop_name", "120"); b.shopDsr(); b.brandHeader(); b.noticeShow(); b.verticalPersonalCenter() }; b.search = function () {
    b.liObj = { keyIndex: -1 }; b.searchFocus(".hd_search_ipt");
        b.searchListHover(b.liObj); b.keyAction(b.liObj); b.searchBoxShowHide(".hd_search_ipt", ".hd_search_form"); b.searchListClick(".hd_search_ipt")
    }; return b
}); $(document).ready(function () { require(["header", "header_miniCart"], function (c, d) { c.init(); d.initCart() }) }); function setHomepage() { if (document.all) { document.body.style.behavior = "url(#default#homepage)"; document.body.setHomePage(httpUrl) } else { if (window.sidebar) { if (window.netscape) { try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect") } catch (c) { alert("è¯¥æ“ä½œè¢«æµè§ˆå™¨æ‹’ç»ï¼Œå¦‚æžœæƒ³å¯ç”¨è¯¥åŠŸèƒ½ï¼Œè¯·åœ¨åœ°å€æ å†…è¾“å…¥ about:config,ç„¶åŽå°†é¡¹ signed.applets.codebase_principal_support å€¼è¯¥ä¸ºtrue") } } var d = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch); d.setCharPref("browser.startup.homepage", httpUrl) } } } function bookmark() {
    var h;
    var e = /^http{1}s{0,1}:\/\/([a-z0-9_\\-]+\.)+(yihaodian|1mall|111|yhd){1}\.(com|com\.cn){1}\?(.+)+$/; if (e.test(httpUrl)) { h = "&ref=favorite" } else { h = "?ref=favorite" } var g = httpUrl + h; var i = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6; if (i) { g = httpUrl } try { if (document.all) { window.external.AddFavorite(g, favorite) } else { try { window.sidebar.addPanel(favorite, g, "") } catch (j) { alert("æŠ±æ­‰ï¼Œæ‚¨æ‰€ä½¿ç”¨çš„æµè§ˆå™¨æ— æ³•å®Œæˆæ­¤æ“ä½œã€‚\n\nåŠ å…¥æ”¶è—å¤±è´¥ï¼Œè¯·ä½¿ç”¨Ctrl+Dè¿›è¡Œæ·»åŠ ") } } } catch (j) { alert("æŠ±æ­‰ï¼Œæ‚¨æ‰€ä½¿ç”¨çš„æµè§ˆå™¨æ— æ³•å®Œæˆæ­¤æ“ä½œã€‚\n\nåŠ å…¥æ”¶è—å¤±è´¥ï¼Œè¯·ä½¿ç”¨Ctrl+Dè¿›è¡Œæ·»åŠ ") }
} function writeHeaderContent() {
    var c = jQuery("#global_login"); var d = window.loli || (window.loli = {}); if (c.size() > 0) {
        if (c.attr("data-type") != null) {
            d.globalCheckLogin(function (i) {
                var j = d.app = d.app || {}; var a = d.app.account = d.app.account || {};
                var h = d.app.user = d.app.user || {}; if (i && i.result == 1) { if (a.onloadUserInfo) { a.onloadUserInfo(i) } else { try { yhdPublicLogin.loadCssAndJs(URLPrefix.statics + "/global/js/login/yhd.topAccount_v2.js", "js") } catch (b) { console("test tonloadUserInfo") } } }
            }); return
        }
    }
} function bothSiteLogoutJsonp() {
    jQuery.getJSON(((typeof URLPrefix.passport != "undefined") ? URLPrefix.passport : "https://passport.yhd.com") + "/passport/logoutJsonp.do?timestamp=" + new Date().getTime() + "&callback=?", function (c) {
        if (c && c.code == "0") {
            var d = (typeof globalSyncCookieFlag != "undefined" && globalSyncCookieFlag == "1") ? 1 : 0; if (d) {
                jQuery.getJSON("https://passport.yihaodian.com.hk/passport/logoutJsonp.do?timestamp=" + new Date().getTime() + "&callback=?", function (a) { if (a && a.code == "0") { window.location.reload() } }); setTimeout(function () { window.location.reload() }, 3000)
            } else { window.location.reload() }
        }
    })
} function hightLightMenu() {
    if ($("#global_menu").size() < 1) { return } var q = (typeof defaultFirstLinkJSON != "undefined" && defaultFirstLinkJSON.url != "") ? defaultFirstLinkJSON : null; var n = $("#global_menu a"); if (q) { var p = loli.util.removeUrlHttp(q.url); var l = false; n.each(function (c, a) { var b = $(a); if (loli.util.removeUrlHttp(b.attr("href")).indexOf(p) == 0) { l = true; b.addClass("light") } else { b.removeClass("light") } }); if (!l) { var o = []; o.push("<li>"); o.push("<a class='light' href='" + q.url + "' data-ref='" + (q.tracker ? q.tracker : "") + "' target='_blank'>" + q.name + "</a>"); o.push("</li>"); $("#global_menu").prepend(o.join("")) } } else {
        var k = window.location.href; if (k.indexOf("?") != -1) { k = k.substring(0, k.indexOf("?")) } var m = /^([https:]*\/\/[\.\w]*\.yhd\.com.*)\/[0-9]+\/?$/; if (m.test(k)) {
            k = k.replace(m, "$1")
        } var j = /^[https:]*\/\/www\.yhd\.com[\/0-9]*/; if (j.test(k)) { $("#global_menu li:first a").addClass("light") } else { var r = -1; k = loli.util.removeUrlHttp(k); n.each(function (c, a) { var b = $(a); if (loli.util.removeUrlHttp(b.attr("href")).indexOf(k) == 0) { r = c; return false } }); if (r != -1) { n.each(function (c, a) { var b = $(a); if (r == c) { b.addClass("light") } else { b.removeClass("light") } }) } }
    }
} function initHeader() { try { writeHeaderContent() } catch (b) { } } function headNavFixed() {
    var c = $("#hdSearchForm"); if (c.size() < 1 || window.isIndex == 1) { return } if ($(".hd_header").hasClass("hd_channel_header") || $(".hd_header").hasClass("hd_city_header")) { return } var d = 660; if ($("#headerNav").size() > 0) { d = $("#headerNav").offset().top } if (typeof isIndex != "undefined" && isIndex == 1) { if ($(".mod_seckill").length > 0) { d = $(".mod_seckill").offset().top } } $(window).scroll(function () {
        var a = $(this).scrollTop();
        if (a > d) { if (!c.hasClass("hd_search_fixed")) { $(".hd_search_tips_result").hide(); $(".hd_head_search").css("z-index", "950"); c.css("top", "-70px"); c.addClass("hd_search_fixed"); $(".hd_search_fixed").animate({ top: 0 }, 500) } } else { c.removeClass("hd_search_fixed"); $(".hd_head_search").css("z-index", "501") }
    })
} function searchHeadNavFixed() { if ($("#headerNav").size() < 0) { return } var b = $("#rankOpDiv").size() > 0 ? $("#rankOpDiv").offset().top : $("#headerNav").offset().top; $(window).scroll(function () { var a = $(this).scrollTop(); if (a > b) { $(".hd_cm_wrap").addClass("hd_cm_fixed") } else { $(".hd_cm_wrap").removeClass("hd_cm_fixed") } }) } var yhdToolKit = window.yhdToolKit = window.yhdToolKit || {}; yhdToolKit.getProductPicByDefaultPic = window.getProductPicByDefaultPic; jQuery(document).ready(function () {
    initHeader(); if (typeof isFixTopNav != "undefined" && isFixTopNav == true) {
        if (typeof headerType != "undefined" && headerType == "search_v1") {
            searchHeadNavFixed()
        } else { headNavFixed() }
    } hightLightMenu(); jQuery("#footerServiceLinkId").lazyDom({ load: false, flushPrice: false, indexLoad: true, callback: function () { } }); $("#footerQRcode,#footerIcon,#footer").lazyImg()
}); (function (B) {
    var u = window.loli || (window.loli = {}); var E = u.app = u.app || {}; var z = E.account = E.account || {}; var A = B.cookie("provinceId"); var y = B.cookie("yihaodian_uid"); var C = 1; var v = { 0: "1", 1: "2", 2: "3", 3: "4", 4: "5", 5: "6" }; var D = { 0: "æ–°æ™‹", 1: "ç™½é“¶", 2: "é»„é‡‘", 3: "é“‚é‡‘", 4: "é’»çŸ³", 5: "1å·ä¹‹æ˜Ÿ" }; var q = B("#global_login"); if (!y || !A) { return } var F = function (c) {
        console.log("_sendAjaxFindUserInfo item:" + c); var a = w(c); q.find(".hd_user_privilege").html(a); var b = ((typeof URLPrefix.central != "undefined") ? URLPrefix.central : "//www.yhd.com") + "/homepage/ajaxUserBenefitInfo.do?callback=?"; var d = function (g) {
            if (g && g.benefitList && g.benefitList.length > 0) {
                var h = g.benefitList;
                var j = []; for (var f = 0; f < h.length; f++) { var i = h[f]; console.log("_sendAjaxFindUserInfo item.benefitName:" + i.benefitName); j.push('<a href="' + i.benefitUrl + '" target="_blank"><i class="iconfont180522">' + i.benefitIcon + "</i><p>" + i.benefitName + "</p></a>") } B(".hd_privilege_tit em").html(h.length); B(".hd_privilege_list").html(j.join("")); B(".hd_privilege_tit").show(); B(".hd_privilege_slide").show(); require(["header"], function (k) { k.privilegeSlide() })
            }
        }; t(); var e = { userId: y, currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId, currSiteType: 1, provinceId: A }; B.getJSON(b, e, function (h) { var f = h; if (f) { if (f.status == 1) { var g = f.userInfo; d(g) } } })
    }; var r = function (a) {
        if (a != null && a != "") {
            a = a.replace(/\&/g, "&amp;"); a = a.replace(/\</g, "&lt;"); a = a.replace(/\>/g, "&gt;"); a = a.replace(/\\/g, "&#92;"); a = a.replace(/\'/g, "&#039;");
            a = a.replace(/\"/g, "&#034;")
        } return a
    }; var w = function (d) {
        if (!d) { return "" } var a = d.memberGrade ? d.memberGrade : 0; if (C) { a = d.memberGradeV2 ? d.memberGradeV2 : 0 } var e = u.util.removeUrlHttp(d.endUserPic); if (!e) { e = URLPrefix.statics + "/global/images/top/avatar_default.jpg" } var b = r(d.uname) || ""; q.find(".hd_login_name").html(b); q.find(".hd_vip").addClass("hd_vip" + v[a]).html(C ? D[a] : ("V" + a)); var c = []; c.push("<a href='javascript:bothSiteLogoutJsonp();' class='hd_login_out'>é€€å‡ºç™»å½•</a>"); c.push("<div class='clearfix'>"); c.push('<a href="//home.yhd.com/myyhdindex/index.do" class="hd_avata_box">'); c.push('<img src="' + e + '" alt="">'); c.push("</a>"); c.push('<div class="fl">'); c.push('<a href="//home.yhd.com/myyhdindex/index.do" title="ç”¨æˆ·å" class="hd_login_name">' + b + "</a>"); c.push('<a href="//vip.yhd.com/" target="_blank" class="hd_vip hd_vip' + v[a] + '">' + (C ? D[a] : ("V" + a)) + "</a>");
        c.push("</div>"); c.push("</div>"); c.push('<div class="hd_privilege_tit" style="display: none"><span>æˆ‘å¯å°Šäº«<em>0</em>é¡¹ç‰¹æƒ</span></div>'); c.push('<div class="hd_privilege_wrap hd_privilege_slide"  style="display: none">'); c.push('  <a href="javascript:;" class="prev_btn hd_iconfont">&#xe62f;</a>'); c.push('<div class="hd_privilege clearfix">'); c.push('<div class="hd_privilege_list">'); c.push("</div>"); c.push("</div>"); c.push('<a href="javascript:;" class="next_btn hd_iconfont">&#xe62b;</a>'); c.push("</div>"); return c.join("")
    }; var s = function (a) { if (!a || !a.isLoginRecently) { return "" } }; var t = function () {
        var a = null; q.hover(function () { if (a != null) { clearTimeout(a) } a = setTimeout(function () { q.addClass("hd_login_hover") }, 200) }, function () {
            if (a != null) { clearTimeout(a) } a = setTimeout(function () {
                q.removeClass("hd_login_hover")
            }, 200)
        }); q.show(); B("#global_unlogin").hide(); B("#global_recentlogin").hide()
    }; var x = function () { var a = B("#global_recentlogin"); var b = null; a.hover(function () { if (b != null) { clearTimeout(b) } b = setTimeout(function () { a.addClass("hd_login_hover") }, 200) }, function () { if (b != null) { clearTimeout(b) } b = setTimeout(function () { a.removeClass("hd_login_hover") }, 200) }); a.show(); B("#global_unlogin").hide(); B("#global_login").hide() }; z.onloadUserInfo = function (c) { if (c) { if (c.result == 1) { F(c) } else { if (c.isLoginRecently == 1) { var a = B("#global_recentlogin"); if (a.size() > 0) { var b = s(c); a.html(b); x() } } } } }; z.showUserInfo = function () { if (q.size() > 0) { u.globalCheckLogin(z.onloadUserInfo) } }; z.showUserInfo()
})(jQuery); var YHDPROVINCE = {}; YHDPROVINCE.getCurentDomain = function () { return URLPrefix.central }; YHDPROVINCE.getOppositeDomain = function () {
    return URLPrefix.central
}; function setAddressCity(n, l, i) { var h = $.cookie("cityId"); var k = {}; var j = null; var m = 0; if (i) { j = l; m = i.cityId } else { if (typeof l == "object") { j = l.targetUrl; m = l.cityId } else { if (l) { j = l } } } if (j) { k.targetUrl = j } k.oldCityId = h; k.cityId = m; loli.cookie.setYhdLocation(n + "_" + m + "_0_0", function () { if (window.isIndex && window.isIndex === 1) { var a = "//www.yhd.com/" + n + "/"; var b = window.location.host; if (b == "preview.yhd.com") { a = "//preview.yhd.com/" + n + "/" } window.location = a + changeParameReg(window.location.search, "cityId", m) } else { window.location.reload() } }) } function changeParameReg(parame, arg, arg_val) {
    if (parame == "" || parame == null || parame == undefined) { return "?" + arg + "=" + arg_val } var pattern = arg + "=([^&]*)"; var replaceText = arg + "=" + arg_val; if (parame.match(pattern)) {
        var tmp = "/(" + arg + "=)([^&]*)/gi"; tmp = parame.replace(eval(tmp), replaceText);
        return tmp
    } else { if (parame.substring(0, 1) == "?") { return "?" + replaceText + "&" + parame.substring(1, parame.length) } if (parame.substring(0, 1) == "&") { return "?" + replaceText + parame } return "?" + replaceText + "&" + parame.substring(0, parame.length) }
} var provinceCity = {
    capitalCity: function () { return { 2: 2817, 1: 2816, 3: 51035, 4: 48131, 5: 142, 6: 303, 7: 412, 8: 560, 9: 639, 10: 698, 11: 799, 12: 904, 13: 1000, 14: 1116, 15: 1213, 16: 1303, 17: 1381, 18: 1482, 19: 1601, 20: 1715, 21: 1827, 22: 1930, 23: 2121, 24: 2144, 25: 2235, 26: 2951, 27: 2376, 28: 2487, 29: 2580, 30: 2628, 31: 2652, 32: 2768, 84: 1310, 52993: 52994 } }, citySelect: function () {
        var N = $(".hd_city_list ul"), E, U = $(".hd_indxProvce"), X = $(".hd_city_search"), Q = X.find(".hd_iconfont"), O = $(".hd_city_select"), S = $(".hd_topbar_city"), I = $(".hd_citys_close"), M = $(".hd_city_suggest"), G = false, H = false, B = $("#currProvince"); var W = []; var J = [];
        N.scrollTop(0); function T() { if (W.length > 0 && E && E.length > 0) { return } for (var a = 0; a < E.length; a++) { W.push(E.eq(a).position().top) } } $(".hd_city_select").hide().removeClass("hd_city_opacity"); $(".hd_city_initial").on("click", "a", function () { var a = $(this).index(); if (W[a]) { N.stop().animate({ scrollTop: W[a] - 10 }) } }); function V(a) { var b = /^[A-Za-z]+$/; if (b.test(a)) { return true } return false } function C(a) {
            var b = []; var f = []; for (var e = 0; e < J.length; e++) { if (b.length > 5) { break } var d = J[e]; if (d.suggestName.indexOf(a) > -1) { b.push('<a href="javascipt:;" data-cityId="' + d.cityId + '" data-provinceId="' + d.provinceId + '">' + d.cityName + "</a>") } else { if ((f.length + b.length) < 6) { if (d.cityPinyin.indexOf(a) > -1) { f.push('<a href="javascipt:;" data-cityId="' + d.cityId + '" data-provinceId="' + d.provinceId + '">' + d.cityName + "</a>") } } } } if (b.length < 6) {
                var c = 6 - b.length;
                if (b.length + f.length >= 6) { f.length = c } b = b.concat(f)
            } return b.join("")
        } function K(c) { var d = []; for (var b = 0; b < J.length; b++) { if (d.length > 5) { break } var a = J[b]; if (a.cityName.indexOf(c) > -1) { d.push('<a href="javascipt:;" data-cityId="' + a.cityId + '" data-provinceId="' + a.provinceId + '">' + a.cityName + "</a>") } } return d.join("") } var R = function (c) { if (J && J.length < 1) { return } var d; if (V(c)) { d = C(c.toLocaleLowerCase()) } else { var a = /[\u4e00-\u9fa5]{1,}/g; var b = c.match(a); if (b.length > 0) { d = K(b[0]) } else { d = K(b) } } M.html(d) }; X.on("keydown", "input", function () { if (this.value.length > 0) { R(this.value.toLowerCase()) } M.show(); I.show(); Q.hide(); H = true }); X.on("click", ".hd_citys_close", function () { M.hide(); I.hide(); Q.show(); X.find("input").val(""); H = false }); X.on("keyup", "input", function () {
            iptVal = this.value; if (iptVal.length > 0) {
                R(iptVal.toLowerCase())
            } if (iptVal == "") { M.hide(); I.hide(); Q.show() }
        }); U.on("click", function (a) { $(this).addClass("hd_cur"); O.show(); G = true; T(); a.stopPropagation() }); U.on("click", ".hd_city_close", function (a) { Y(); a.stopPropagation() }); $(document).click(function (a) { if (!G) { return } var b = $(a.target); if (b.parents(".hd_city_select").length == 0 || b.is(".hd_city_close")) { Y() } }); $(".hd_city_select").click(function (a) { if (!H) { return } var b = $(a.target); if (!b.is(".hd_city_suggest")) { M.hide(); X.find("input").focus(); H = false } }); function L(a) { var b = $(a); b.on("click", "a", function () { var d = $(this).attr("data-provinceId"); var c = $(this).attr("data-cityId"); setAddressCity(d, { cityId: c }); Y(); var e = $(this).text(); B.find("em").text(e); return false }) } var D = []; function F(l) {
            var j = []; var a = O.attr("data-hot"); var i = []; var e; if (a) {
                var k = a.split("&&");
                for (var f = 0; f < k.length; f++) { var m = k[f].split(","); if (m.length > 2) { i.push('<a href="javascipt:;" data-cityId="' + m[0] + '" data-provinceId="' + m[2] + '">' + m[1] + "</a>") } }
            } $(".hd_hotcity_list").html(i.join("")); var d = l.objCitys; var h = []; if (!l) { return } for (var b in d) { h.push('<a href="javascript:;">' + b + "</a>"); var c = '<li class="clearfix"> <div class="hd_city_innitial_tit">' + b + '</div><div class="hd_city">'; for (var g = 0; g < d[b].length; g++) { e = d[b][g]; if (typeof e.cityId == "undefined") { continue } if (a && a.indexOf(e.cityName) > -1) { D.push(e) } else { J.push(e) } c = c + '<a href="javascipt:;" data-cityId="' + e.cityId + '" data-provinceId="' + e.provinceId + '">' + e.cityName + "</a>" } c = c + "</div></li>"; j.push(c) } J = D.concat(J); $(".hd_city_initial").html(h.join("")); $(".hd_city_list ul").html(j.join("")); E = $(".hd_city_list li")
        } function Z() {
            var a = "//www.yhd.com/homepage/getAllCity.do";
            $.ajax({ type: "GET", url: a, timeout: 2000, dataType: "jsonp", jsonpCallback: "jsonp_getAllCity" + new Date().getMonth(), cache: true, success: function (c) { if (c) { try { if (window.sessionStorage && window.sessionStorage.setItem) { var b = JSON.stringify(c); window.sessionStorage.setItem("_allCityData", b) } } catch (d) { } F(c) } }, error: function () { F({}) } })
        } function Y() { U.removeClass("hd_cur"); O.hide(); M.hide(); G = false } try { if (window.sessionStorage && window.sessionStorage.getItem) { var P = window.sessionStorage.getItem("_allCityData"); var aa = JSON.parse(P); if (aa) { F(aa) } else { Z() } } else { Z() } } catch (ab) { Z() } L(".hd_hotcity_list"); L(".hd_city_list"); L(".hd_city_suggest")
    }, initProvince: function () {
        function q(b) {
            var a = { cityId: b }; var c = "//www.yhd.com/homepage/getCityById.do"; $.ajax({
                type: "GET", url: c, data: a, dataType: "jsonp", jsonpCallback: "jsonp_getCityById" + new Date().getMonth(), cache: true, success: function (e) {
                    if (e && e.city) {
                        $("#currProvince").find("em").text(e.city.cityName);
                        var f = jQuery.cookie("yhd_location"); var g = jQuery.cookie("provinceId"); var d = jQuery.cookie("cityId"); if (d != e.city.cityId || g != e.city.provinceId) { d = e.city.cityId; g = e.city.provinceId; $.cookie("cityId", d, { domain: "yhd.com", path: "/", expires: 800 }); $.cookie("provinceId", g, { domain: "yhd.com", path: "/", expires: 800 }) } if (f == undefined) { f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0"); $.cookie("yhd_location", f, { domain: "yhd.com", path: "/", expires: 800 }) } else {
                            if (g > 4 && (f.split("_")[2] == 0 || typeof f.split("_")[2] == "undefined")) { f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0"); $.cookie("yhd_location", f, { domain: "yhd.com", path: "/", expires: 800 }) } else {
                                if (g < 5 && (f.split("_")[2] == 0 || typeof f.split("_")[2] == "undefined")) {
                                    f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0");
                                    $.cookie("yhd_location", f, { domain: "yhd.com", path: "/", expires: 800 })
                                }
                            }
                        }
                    }
                }, error: function () { }
            })
        } var y = jQuery.cookie("provinceId"); try { var x = jQuery.cookie("yhd_location"); if (x) { var p = x.split("_"); if (p && p.length >= 4) { if (p[0] != y) { y = p[0]; $.cookie("provinceId", y, { domain: "yhd.com", path: "/", expires: 800 }); $.cookie("cityId", p[1], { domain: "yhd.com", path: "/", expires: 800 }) } } } } catch (A) { console.log(A) } if (y >= 5 && y <= 32) { var v = jQuery.cookie("cityId"); if (!v || v == "0") { var C = provinceCity.capitalCity(); v = C[y]; $.cookie("cityId", v, { domain: "yhd.com", path: "/", expires: 800 }) } q(v) } else { if (y > 0 && y < 5) { q(y) } else { loli.cookie.setYhdLocation(); q(2) } } var B = document.domain; if (loli.util.url && (B == "www.yhd.com" || B == "1mall.yhd.com")) {
            var u = window.location.href; var s = loli.util.url.getParams(u); if (s && (s.cityId || s.cityId === "0")) {
                var z = s.cityId;
                var w = 2; var r = jQuery.cookie("yhd_location"); if (typeof (r) != "undefined" && r) { var t = r.split("_"); w = t[1] } if (z != w) { w = jQuery.cookie("cityId"); if (!w || w == "0") { w = 2 } if (z != w) { var D = loli.util.url.deleteParams(u, ["cityId"]); D = loli.util.url.appendParams(D, { cityId: w }); if (w == 2) { D = loli.util.url.appendParams(D, { forceId: 2 }) } window.location.href = D } }
            }
        } provinceCity.citySelect()
    }
}; jQuery(document).ready(function () { provinceCity.initProvince() }); define("header_miniCart", function () {
    var g = {}; var f = URLPrefix.cartDomain || "//cart.yhd.com"; var e = $("#in_cart_num"); var h = function () {
        var a = jQuery.cookie("cart_num"); var b = (a && !isNaN(a)) ? parseInt(a) : 0; jQuery.ajax({
            type: "GET", url: f + "/cart/opt/getCartCount.do", timeout: 5000, dataType: "jsonp", jsonpCallback: "jsonp" + new Date().getTime(), cache: false, success: function (c) {
                if (c && c.code == "00000000" && c.data > 0) {
                    e.text(c.data > 999 ? "999+" : c.data);
                    e.show(); $("#prismCartNum").removeClass("none").find("u").html(c.data)
                } else { e.hide(); $("#prismCartNum").addClass("none").find("u").empty() }
            }, error: function (j, c, d) { e.hide(); $("#prismCartNum").addClass("none").find("u").empty() }
        })
    }; g.initCart = function () { h() }; return g
}); var yhdLib = window.yhdLib || (window.yhdLib = {}); if (!yhdLib.hasOwnProperty("popwin")) {
yhdLib.popwin = function (param) {
    var arg = param, tcBox = ".popGeneral", sFun = arg.fun ? arg.fun : [], cTxt = arg.popcontentstr ? arg.popcontentstr : "", popEvent = arg.popevent ? arg.popevent : "click", autoClose = arg.autoclosetime; var fixed = typeof (arg.fix) == "undefined" || arg.fix ? true : false; var ieLower = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6; if (arg.clickid) {
        $(arg.clickid).bind(popEvent, function () {
            if ($(".popGeneral").length == 0) {
                popMask()
            }
        })
    } else { if ($(".popGeneral").length == 0) { popMask() } } function popMask() {
        var dwidth = "100%", dheight = $(document).height(); if (ieLower) { $("select:visible", ".delivery").each(function (i) { $(this).addClass("selectSjl").hide() }) } var popBOX = !fixed ? '<div class="popGeneral" style="position:absolute;" ' : '<div class="popGeneral" '; if (arg.poptitle) { popBOX += '><div class="top_tcgeneral"><h4>' + arg.poptitle + '</h4><span class="close_tcg">&times;</span></div></div>' } else { popBOX += "></div>" } if (arg.mask || arg.mask == null) { $('<div class="mask_tcdiv"></div>').appendTo($("body")).css({ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 100001, width: dwidth + "", height: dheight + "px", background: "#000", opacity: 0.4 }) } $(popBOX).appendTo($("body")); loli.scroll(function () { $(".mask_tcdiv").height($(document).height()) }); if (arg.popwidth) {
            $(".popGeneral").width(arg.popwidth)
        } if (arg.popheight) { $(".popGeneral").height(arg.popheight) } var apTxt = cTxt ? $(cTxt) : $(arg.popcontent).clone(); apTxt.appendTo($(tcBox)).show(); popPosition(); for (var funI = sFun.length - 1; funI >= 0; funI--) { eval(sFun[funI] + "()") } return false
    } function popPosition() {
        var popwinTop = 0; $(window).resize(function () { var width = $(tcBox).width(), height = $(tcBox).height() / 2, windWidth = $(window).width(), pLeft = (windWidth - width) / 2; $(tcBox).css({ left: pLeft, top: "50%", bottom: "auto", marginTop: "-" + height + "px" }); popwinTop = $(window).height() / 2 - height }).trigger("resize"); if (ieLower && fixed) { $(window).scroll(function () { $(tcBox).css({ top: popwinTop + $(window).scrollTop() + "px", marginTop: 0 }) }).trigger("scroll") } $(".close_tcg").click(function () { closeTc() }); if (autoClose) { setTimeout(function () { closeTc() }, autoClose) } if (arg.outareaclose) {
            $(".mask_tcdiv").click(function () {
                closeTc()
            })
        } $(window).keydown(function (event) { if (event.keyCode == 27) { closeTc() } }); return false
    } function closeTc() { $(".popGeneral").remove(); $(".mask_tcdiv").remove(); if (ieLower) { $("select.selectSjl").each(function () { $(this).removeClass("selectSjl").show() }) } } return false
}
} if (!yhdLib.hasOwnProperty("popclose")) { yhdLib.popclose = function () { var b = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6; if (b) { $("select.selectSjl").each(function () { $(this).removeClass("selectSjl").show() }) } $(".popGeneral,.mask_tcdiv").remove() } } if (!yhdLib.hasOwnProperty("popwinreload")) { yhdLib.popwinreload = function () { if ($("body > .popGeneral").length) { $(window).trigger("resize") } } } if (!yhdLib.hasOwnProperty("ratebox")) {
yhdLib.ratebox = function (rateboxArgus) {
    var rateArg = rateboxArgus, rateObj = document.getElementById(rateArg.id), rateDg = rateArg.ratedegree;
    if (rateArg.autorate) { var rtim = rateArg.ratetime ? rateArg.ratetime : 15, step = rateArg.step ? rateArg.step : 20; if (rateDg >= 0) { setInterval(function () { rate(rateObj, (rateDg += step) >= 360 ? rateDg = 0 : rateDg); return false }, rtim) } else { if (rateDg < 0) { setInterval(function () { rate(rateObj, (rateDg -= step) <= 0 ? rateDg = 360 : rateDg); return false }, rtim) } } } else { rate(rateObj, rateDg) } function rate(obj, degree) {
        var ST = obj.style; if (document.all) {
            var deg = degree * Math.PI / 180, M11 = Math.cos(deg), M12 = -Math.sin(deg), M21 = Math.sin(deg), M22 = Math.cos(deg); obj.fw = obj.fw || obj.offsetWidth / 2; obj.fh = obj.fh || obj.offsetHeight / 2; var adr = (90 - degree % 90) * Math.PI / 180, adp = Math.sin(adr) + Math.cos(adr); with (ST) {
                filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + M11 + ",M12=" + M12 + ",M21=" + M21 + ",M22=" + M22 + ",SizingMethod='auto expand');"; top = obj.fh * (1 - adp) + "px";
                left = obj.fw * (1 - adp) + "px"
            }
        } else { var rotate = "rotate(" + degree + "deg)"; with (ST) { MozTransform = rotate; WebkitTransform = rotate; OTransform = rotate; Transform = rotate } } return false
    } return false
}
} if (!yhdLib.hasOwnProperty("alert")) { yhdLib.alert = function (i, j, h, l, k) { var g = '<div class="msgBxShow">'; g += '<i class="icon_tips icon_warning"></i><span id="error_popwin">' + i + "</span>"; g += '</div><p class="pop_btn_box"><button id="close_tcg" class="close_tcg">ç¡®å®š</button></p>'; yhdLib.popwin({ popwidth: h, popheight: l, popcontent: g, popevent: k, outareaclose: true }); if (j) { jQuery("#close_tcg").click(function () { j() }) } } } jQuery.yhdtool = yhdLib; var loginFrameClientFunction; var loginRegisterFrameType; function passportLoginFrame(n, q, v, x) {
    loginFrameClientFunction = v; loginRegisterFrameType = x; var r = encodeURIComponent(returnUrl ? returnUrl : window.location.href);
    var t = window.location.protocol; var s = window.location.host; var w = t + "//" + s; if (q) { w = w + q } encodeCurrentDomain = encodeURIComponent(w); var u = '<iframe frameBorder=0 scrolling="no" style="border: 0px none;background:url(//d6.yihaodianimg.com/N01/M02/1C/03/CgQCrlD3yRSAFpX-AAAJ84RedYA15700.jpg) no-repeat center;" width="450" height="345" id="loginIframe"></iframe>'; var p = "ç”¨æˆ·ç™»å½•"; yhdLib.popwin({ poptitle: p, popcontentstr: u }); var m = n + "/publicPassport/loginFrame.do?fromDomain=" + encodeCurrentDomain + "&returnUrl=" + r; var o = $("#loginIframe", document.body); setTimeout(function () { o.attr("src", m); o.focus() }, 0)
} function passportLoginFrameCallback(h, g) {
    yhdLib.popclose(); if (g) { var i = decodeURIComponent(g); window.location.href = i } else {
        if (loginRegisterFrameType == 2 && h == 10) {
            var j = "1å·åº—"; var f = '<div class="regLROk" style="position:relative; width:320px; text-align:center; z-index:1;"><div class="inner" style="padding:35px 0; background-color:#fff;"><p style="font-size:14px; font-weight:bold; color:#333; line-height:35px;">æ¬¢è¿Žæ‚¨æˆä¸º' + j + 'ä¼šå‘˜ï¼Œç¥æ‚¨è´­ç‰©æ„‰å¿«ï¼</p><span style="color:#999;">3såŽè‡ªåŠ¨å…³é—­</span></div><div class="regLROkMask" style="position:absolute; width:340px; height:140px; top:-10px; left:-10px; background-color:#000; opacity:0.5; filter:alpha(opacity=50); z-index:-1;"></div></div>';
            yhdLib.popwin({ poptitle: "", popcontentstr: f }); setTimeout(function () { loginFrameClientFunction(h) }, 3000)
        } else { loginFrameClientFunction(h) }
    }
} var returnUrl = document.location.href; var yhdPublicLogin = yhdPublicLogin || {}; var URLPrefix_passport = URLPrefix.passport; yhdPublicLogin.checkLogin = function (c) { if (!c) { if (yhdPublicLogin.getCookie("ut")) { return true } else { return false } } var d = "https://passport.yhd.com/publicPassport/isLogin.do?callback=?"; jQuery.ajax({ type: "get", url: d, dataType: "json", success: function (a) { if (a.result == "1") { c(true); return } c(false) }, error: function () { c(false) } }) }; yhdPublicLogin.getCookie = function (f) { var e = document.cookie.split(";"); for (var g = 0; g < e.length; g++) { var h = e[g].split("="); if (h[0].replace(/(^\s*)|(\s*$)/g, "") == f) { return h[1] } } return "" }; yhdPublicLogin.loadCssAndJs = function (h, f) {
    var e = "";
    var g = 0; if (typeof currVersionNum != "undefined") { g = currVersionNum } if (f == "js") { e = document.createElement("script"); e.setAttribute("type", "text/javascript"); e.setAttribute("charset", "UTF-8"); e.setAttribute("src", h + "?" + g) } else { if (f == "css") { e = document.createElement("link"); e.setAttribute("rel", "stylesheet"); e.setAttribute("type", "text/css"); e.setAttribute("href", h + "?" + g) } } if (typeof e != "undefined") { document.getElementsByTagName("head")[0].appendChild(e) }
}; yhdPublicLogin.showLoginDiv = function (e, f, g) {
    function h() {
        if (e) { var b = ""; if (e.toLowerCase().indexOf("http") < 0) { var l = window.location.protocol; var d = window.location.host; var k = l + "//" + d; b = k } var c = b + e; returnUrl = c } try {
            passportLoginFrame(URLPrefix_passport, null, function (j) {
                try {
                    if (returnUrl) { window.location.href = returnUrl } else {
                        window.location.reload(true)
                    }
                } catch (i) { }
            }, g)
        } catch (a) { }
    } if (f) { yhdPublicLogin.checkLogin(function (a) { if (!a) { h() } }) } else { h() }
}; yhdPublicLogin.showLoginDivNone = function (k, j, e, h, l) { try { if (j) { yhdPublicLogin.checkLogin(function (a) { if (!a) { passportLoginFrame(k, e, h, l) } }) } else { passportLoginFrame(k, e, h, l) } } catch (i) { } }; yhdPublicLogin.showTopLoginInfo = function () { try { writeHeaderContent() } catch (b) { } }; jQuery(document).ready(function () { yhdPublicLogin.loadCssAndJs("//passport.yhd.com/front-passport/passport/js/login_frame_client.js", "js") }); define("userCenter", function () {
    function e() { $.ajax({ dataType: "jsonp", url: "/homepage/userInfo.do", success: function (l) { if (l && "1" == l.result) { var k = l.data; g(k) } else { console && console.log(l.msg || "è¯·æ±‚å¤±è´¥") } } }) } $(function () { window.loli.globalCheckLogin(function (k) { if (k.result == "0") { return } e() }) }); function a(l) {
    l.grade = l.grade || 0;
        l.defList = l.defList || []; for (var m = 0; m < l.defList.length; m++) { var k = l.defList[m]; if (k.grade == l.grade) { l.gradeDesc = k.name.replace(/ä¼šå‘˜/, "") } }
    } var d = 24 * 3600 * 1000; function c(k) { var l = k.createTime ? new Date(k.createTime) : new Date(); k.registDays = Math.ceil((new Date() - l) / d) } function b() { var k = ["index_account_icon_login", "index_account_icon_unlogin", "index_account_info_login", "index_account_info_unlogin"]; for (var m = 0; m < k.length; m++) { var l = m % 2 == 0; document.getElementById(k[m]).style.display = l ? "block" : "none" } } function f(k) { var l = $("#index_account").removeClass("vip2_center").addClass("vip" + (k.grade + 1) + "_center"); h(l, k); $("#index_account_icon_login").html('<img src="' + k.iconUrl + '">') } function h(l, m) {
        if (l && l.length > 0) {
            var n = l.html(); for (var k in m) {
                if (m.hasOwnProperty(k)) {
                    n = n.replace(new RegExp("__" + k + "__", "g"), m[k])
                }
            } l.html(n)
        }
    } function j(k) { k.sex = k.sex || 0; var l = URLPrefix.statics + "/global/images/top/avatar_default.jpg"; k.iconUrl = k.endUserPic || l; k.nickName = i(k.nickName) } function i(k) { if (k && k.length > 0) { return k.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "&#92;").replace(/'/g, "&#039;").replace(/"/g, "&#034;") } return k } function g(k) { b(); j(k); a(k); c(k); f(k) } return { init: e }
}); require(["userCenter"]); define("common_cart", function () {
    var o = {}; var m = URLPrefix.cartDomain || "//cart.yhd.com"; var s = $("#miniCart"); var n = $("#in_cart_num"); var p = function (b, a) { l(b, a) }; var q = function (b, a) { l(b, a) }; var k = function (a, b, c) { }; var r = function (d) {
        var b = m + "/cart/opt/add.do"; var c = { pcount: d.pcount, pid: d.pid, ptype: d.ptype, sku: d.sku || "", did: d.did || "", gids: d.gids || "", zids: d.zids || "", targetId: d.targetId || 0 };
        var a = function (f) { var e = URLPrefix.item || "//item.m.yhd.com"; e += "/" + $.trim(f) + ".html"; window.location.href = e; return true }; jQuery.ajax({ url: b, data: c, dataType: "jsonp", jsonp: "callback", jsonpCallback: "jsonp" + new Date().getTime(), cache: false, timeout: 5000, success: function (f) { if (f && f.code) { var e; switch (f.code) { case "00000000": e = "æ“ä½œæˆåŠŸ"; break; case "50000005": e = "ç‹¬ç«‹ç§’æ€å•†å“ä¸åœ¨æ­¤å¤„åŠ è½¦"; break; case "60000001": e = "æ— æ•ˆå•†å“"; break; case "60000002": e = "æœªé€‰ä¸­å•†å“"; break; case "60000003": e = "å•†å“æ— åº“å­˜"; break; case "60000004": e = "æ— æ»¡è¶³çš„è™šæ‹Ÿå¥—è£…è§„åˆ™"; break; case "60000005": e = "æ“ä½œå¤ªé¢‘ç¹"; break; case "99999999": e = "ç³»ç»Ÿå¼‚å¸¸"; break } } e = e || "ç³»ç»Ÿå¼‚å¸¸"; if (f.code == "00000000") { p(f, e); t(); s.data("cart-item-loaded", 0) } else { if (f.code == "50000005") { return a(d.pid || "0") } else { q(f, e) } } }, error: function (h, e, f) { try { var i = d.pid || "0" } catch (g) { console.log(g) } l("", "åŠ å…¥è´­ç‰©è½¦å¤±è´¥"); k(h, e, f) } })
    }; var l = function (e, a) {
        var d = 0;
        var b = 0; var f = function () { var A = $("#addCartPopWin"); var z = $("a.hd_show_pre", A); var D = $("a.hd_show_next", A); var j = A.find("div.hd_recommend_list ul"); var i = A.find("div.hd_recommend_list").width() + 15; var g = $("div.hd_recommend_list li", A).size(); var h = 4; var B = (g % h == 0) ? Math.floor(g / h) : Math.floor(g / h) + 1; var C = 1; if (B > 1) { D.show(); z.click(function () { if (C > 1) { j.animate({ left: "-" + (C - 2) * i + "px" }, function () { C--; if (C < B) { D.show() } if (C == 1) { z.hide() } }) } else { z.hide(); D.show() } }); D.click(function () { if (C < B) { j.animate({ left: "-" + (C) * i + "px" }, function () { C++; if (C > 1) { z.show() } if (C == B) { D.hide() } }) } else { z.show(); D.hide() } }) } }; if (d) { clearTimeout(d) } if (b) { return } var c = []; c.push("<div id='addCartPopWin' class='hd_cart_pop' data-tpa='AI_REAL_TIME_LANDINGPAGE'>"); c.push("<div class='hd_pop_content'>"); c.push("<span class='hd_colse_btn' onclick='javascript:yhdLib.popclose();'></span>");
        if (e && e.code == "00000000") { c.push("<p class='hd_pop_tips'><i></i>å·²æˆåŠŸåŠ å…¥è´­ç‰©è½¦</p>"); c.push("<div class='hd_pop_btn'>"); c.push("<a href='javascript:yhdLib.popclose();' class='hd_btn_l' data-ref='product_popup_jxgw'>ç»§ç»­è´­ç‰©</a>"); c.push("<a href='//cart.yhd.com/cart/cart.do?action=view' class='hd_btn_r' data-ref='product_popup'>æŸ¥çœ‹è´­ç‰©è½¦</a>"); c.push("</div>") } else { c.push("<p class='hd_pop_tips'><i class='hd_error_icon'></i>" + a + "</p>"); c.push("<div class='hd_error_tips'>"); c.push(e.msg); c.push("</div>") } c.push("</div>"); c.push("</div>"); yhdLib.popwin({ popcontentstr: c.join("") }); b = 1; f()
    }; var t = function () {
        jQuery.ajax({
            type: "GET", url: m + "/cart/opt/getCartCount.do", timeout: 5000, dataType: "jsonp", jsonpCallback: "jsonp" + new Date().getTime(), success: function (a) {
                if (a && a.code == "00000000" && a.data > 0) {
                    n.text(a.data > 999 ? "999+" : a.data);
                    n.show(); if ($("#prismCartNum").length > 0) { $("#prismCartNum").removeClass("none").find("u").html(a.data) }
                } else { n.hide(); if ($("#prismCartNum").length > 0) { $("#prismCartNum").addClass("none").find("u").empty() } }
            }
        })
    }; o.addToCart = function (b, a) { if (typeof a != "undefined" && a) { if (a.addToCartSuccess) { p = a.addToCartSuccess } if (a.addToCartError) { q = a.addToCartError } if (a.addToCartServerError) { k = a.addToCartServerError } } r(b) }; return o
}); (function (k) {
    function e() { var n = window.loli || (window.loli = {}); var m = n.prism = n.prism || {}; m.functions = m.functions || { init: g, showIm: f } } function f(m) { var n = k("#prismIm"); if (m && m.length > 0) { n.show().find("a").attr("href", m) } else { n.hide() } } function g() {
        if (!(window.globalPrismFlag && globalPrismFlag == "1")) { return } if (loli.util.isIE() && loli.util.isIE() <= 6) { return } k("body").append(d()); a(); j();
        f(false)
    } function l() {
        return [{ id: "prismTopAdv", text: "å¤§ä¿ƒå¹¿å‘Š", type: "adv", iconfont: "", position: "top", disable: false, expand: false, expandCss: "prism_ad_show", tpc: 1, url: "" }, { id: "prismPerson", text: "ä¸ªäººä¸­å¿ƒ", type: "icon", iconfont: "&#xe616;", position: "center", disable: false, expand: false, expandCss: "prism_cart_show", tpc: 10, url: globalPrismMemberLink }, { id: "prismCart", text: "è´­ç‰©è½¦", type: "cart", iconfont: "&#xe618;", position: "center", disable: false, expand: false, expandCss: "prism_cart_show", tpc: 10, url: globalPrismCartLink }, { id: "prismCoupon", text: "ä¼˜æƒ åˆ¸", type: "icon", iconfont: "&#xe628;", position: "center", disable: false, expand: false, expandCss: "prism_coupon_show", tpc: 30, url: globalPrismCouponLink }, { id: "prismIm", text: "å’¨è¯¢å®¢æœ", type: "icon", iconfont: "&#xe63f;", position: "bottom", disable: false, expand: false, expandCss: "", tpc: 50 }, { id: "prismFeedback", text: "ç”¨æˆ·åé¦ˆ", type: "icon", iconfont: "&#xe615;", position: "bottom", disable: false, expand: false, expandCss: "", tpc: 50, url: globalPrismFeedbackURL }, { id: "prismQRCode", text: "äºŒç»´ç ", type: "icon", iconfont: "&#xe610;", position: "bottom", disable: false, expand: false, expandCss: "", tpc: 60 }, { id: "prismBacktop", text: "è¿”å›žé¡¶éƒ¨", type: "icon", iconfont: "&#xe62d;", position: "bottom", disable: false, expand: false, expandCss: "", tpc: 70 }]
    } function h(n) { var o = {}; for (var m = 0; m < n.length; m++) { o[n[m].id] = n[m] } return o } function i() { var m = typeof customPrismConfig == "undefined" ? [] : customPrismConfig; return k.extend(h(l()), h(m)) } function d() { var m = i(); var n = ['<div id="prismWrap" class="yhd_prism_wrap">']; n = n.concat(c("top", "prism_top_ad", m)); n.push('<div class="yhd_prism_nav">'); n = n.concat(c("center", "prism_nav_center", m)); n = n.concat(c("bottom", "prism_nav_btm", m)); n.push("</div>"); n.push("</div>"); return n.join("") } function c(m, o, r) { var q = ['<div class="' + o + '">']; for (var n in r) { if (r.hasOwnProperty(n)) { var p = r[n]; if (p.disable || p.position != m) { continue } q.push(b(p)) } } q.push("</div>"); return q } function b(q) {
        var m = []; var p = q.url ? q.url : "javascript:;"; var o = q.url ? 'target="_blank"' : ""; if (q.type == "cart") {
            m.push('<div class="prism_nav_tab prism_cart_wrap" clstag="pageclick|keycount|lengjing_201709227|2" data-type="' + q.type + '" id="' + q.id + '">');
            m.push('<a class="prism_cart_tab" href="' + p + '" ' + o + ">"); m.push('<em class="prism_iconfont">' + q.iconfont + "</em>"); m.push('<div class="prism_cart_text">' + q.text + "</div>"); m.push('<p id="prismCartNum" class="prism_cart_num none"><u></u></p>'); m.push("</a>"); m.push("</div>")
        } else {
            if (q.type == "icon") {
                var n; switch (q.id) { case "prismCoupon": n = "pageclick|keycount|lengjing_201709227|3"; break; case "prismFeedback": n = "pageclick|keycount|lengjing_201709227|5"; break; case "prismQRCode": n = "pageclick|keycount|lengjing_201709227|6"; break; case "prismFavorite": n = "pageclick|keycount|lengjing_201709227|4"; break; case "prismBacktop": n = "pageclick|keycount|lengjing_201709227|7"; break; default: n = "" }m.push('<div class="prism_nav_tab prism_icon_wrap" clstag="' + n + '" data-type="' + q.type + '" id="' + q.id + '">'); m.push('<a href="' + p + '" ' + o + ">");
                m.push('<span class="prism_icon_tab">'); m.push('<em class="prism_iconfont">' + q.iconfont + "</em>"); m.push("</span>"); m.push('<u class="prism_icon_text">' + q.text + "</u>"); m.push("</a>"); m.push("</div>")
            } else { if (q.type == "adv") { m.push('<div class="prism_nav_tab" data-type="' + q.type + '" id="' + q.id + '">'); m.push("</div>") } else { if (q.type == "coin") { m.push('<div class="prism_nav_tab prism_wilful_coin_wrap" data-type="" id="' + q.id + '">'); m.push('<a href="javascript:;">'); m.push('<div class="prism_wc_icon"><span></span></div>'); m.push('<em class="prism_wc_pic"><u></u></em>'); m.push('<div class="prism_wc_getcoin none"></div>'); m.push("</a>"); m.push("</div>") } } }
        } return m.join("")
    } function a() {
        k("#prismWrap").on("click", "#prismBacktop", function () { k("body, html").stop().animate({ scrollTop: 0 }) }).on("mouseenter", ".prism_icon_wrap", function () {
            k(this).addClass("prism_icon_hover")
        }).on("mouseleave", ".prism_icon_wrap", function () { k(this).removeClass("prism_icon_hover") })
    } function j() { var n = k("#prismQRCode").hide(); if (!!globalPrismQRPng) { var m = []; m.push('<div class="prism_tips_wrap prism_yhd_code none">'); m.push('<p style="text-align:center;">' + window.globalPrismQRName + "<br/>" + window.globalPrismQRTitle + "</p>"); m.push('<img src="' + window.globalPrismQRPng + '">'); m.push('<em class="tips_arrow"></em>'); m.push("</div>"); n.find(".prism_tips_wrap").remove().end().append(m.join("")); n.find(".prism_icon_text").addClass("none"); n.show() } } k(function () { e(); loli.prism.functions.init() })
})(jQuery); (function (a) {
    a(function () {
        var i = window.loli || (window.loli = {}); var e = i.prism = i.prism || {}; var f = a.cookie("provinceId") || 1; var h = (typeof globalPrismFlag != "undefined" && globalPrismFlag == "1") ? 1 : 0;
        if (!h) { return } if (i.util.isIE() && i.util.isIE() <= 6) { return } var b = (typeof globalPrismTopAdvFlag != "undefined" && globalPrismTopAdvFlag == "0") ? 0 : 1; if (!b) { return } var g = a("#prismTopAdv"); var d = function (l) { var m = []; var k = l.data.GENERAL_GLOBAL_LJDCRK_KT; var j = k ? k[0] : null; if (j) { var m = []; m.push("<a href='" + i.util.removeUrlHttp(j.linkUrl) + "' target='_blank' title='" + j.displayContent + "' >"); m.push("<img src='" + i.util.removeUrlHttp(j.imageUrl) + "'>"); m.push("</a>") } return m.join("") }; var c = function () {
            var j = URLPrefix.central + "/header/ajaxGetPrismAdvs.do?callback=?"; var l = function (n) { if (n.status == "1" && n.data) { i.prism.advsData = n; var m = d(n); if (m != "") { g.html(m) } } }; var k = { currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId, currSiteType: 1, provinceId: f }; a.ajax({
                url: j, data: k, dataType: "jsonp", timeout: 5000, jsonpCallback: "GLOBALPRISMADVS", cache: true, success: function (m) {
                    if (m) {
                        l(m)
                    }
                }
            })
        }; c()
    })
})(jQuery); (function (i) {
    var g = window.loli || (window.loli = {}); var j = {
        reloadPage: function (a) { var b = k(window.location.href, a); window.location.href = b }, refreshPage: function (b, c, d) { var a = k(b, c, d); window.location.href = a }, openPage: function (c, e, f, d, o) { var p = k(e, c, o); var a = ""; if (typeof (f) != "undefined" && f) { a = f } var b = ""; if (typeof (d) != "undefined" && d) { b = d } window.open(p, a, b) }, isVisual: function (a) { if (!a) { return false } var b = a.offsetHeight; var d = document.documentElement.clientHeight; var c = document.documentElement.scrollTop || document.body.scrollTop; var e = h(a).top + b / 2; if (e < d + c && e > c) { return true } else { return false } }, isVisualByTop: function (a) {
            if (!a) { return false } var d = h(a).top; var c = document.documentElement.clientHeight; var e = d + a.offsetHeight; var b = document.documentElement.scrollTop || document.body.scrollTop;
            if ((d <= c + b && d >= b) || (d <= b && e >= b)) { return true } else { return false }
        }
    }; function h(a) { var b = 0; var c = 0; while (a) { b += a.offsetTop; c += a.offsetLeft; a = a.offsetParent } return { top: b, left: c } } function k(a, f, e) { if (typeof (a) == "undefined" || !a) { return "" } var d = typeof (f); if (d == "undefined" || !f) { return a } var c = null; if (d == "string") { var n = f; var b = f.indexOf("#"); if (b == -1) { n = "#" + n } c = i(n) } else { if (d == "object") { c = f } } if (!c) { return a } return a } function l(b, a) { return b.closest("[" + a + "]") } g.spm = j
})(jQuery); (function (u) {
    var L = (typeof isSearchKeyWords != "undefined" && isSearchKeyWords == "1") ? 1 : 0; var D = (typeof isIndex != "undefined" && isIndex == 1) ? 1 : 0; var z = (typeof globalSearchSelectFlag != "undefined" && globalSearchSelectFlag == "0") ? 0 : 1; var H = (typeof globalSearchHotkeywordsFlag != "undefined" && globalSearchHotkeywordsFlag == "0") ? 0 : 1; var M = u("#keyword");
    var I = u("#searchSuggest"); var y = u("#fix_keyword"); var J = u("#fix_searchSuggest"); var x = u("#leaf"); var F = u("#hdSearchTab"); var N = window.loli || (window.loli = {}); var E = N.app = N.app || {}; var v = E.search = E.search || {}; var G = u.cookie("provinceId") || 1; var B = u.cookie("cityId") || 0; var K = u.cookie("yihaodian_uid"); var A = false; var w = URLPrefix.search_keyword || "//search.yhd.com"; v.delayCall = function (e, a, b, f) { u(e).data("lastTime", new Date().getTime()); if (a) { var d = a.call(u(e)); u(e).data("lastResult", d) } var c = setTimeout(function () { var h = u(e).data("lastTime") ? u(e).data("lastTime") : new Date().getTime(); var i = (typeof u(e).data("lastResult") == "undefined" || u(e).data("lastResult")) ? true : false; var g = new Date().getTime(); if (g - h >= (f - 50)) { if (b && i) { b.call(u(e)) } } }, f) }; v.filterXml = function (a) {
        if (a != null && a != "" && typeof a == "string") {
            a = a.replace(/\&/g, "&amp;");
            a = a.replace(/\</g, "&lt;"); a = a.replace(/\>/g, "&gt;"); a = a.replace(/\\/g, "&#92;"); a = a.replace(/\'/g, "&#039;"); a = a.replace(/\"/g, "&#034;")
        } return a
    }; v.filterJs = function (a) { if (a != null && a != "" && typeof a == "string") { a = a.replace(/\&/g, "%5C%26"); a = a.replace(/\</g, "%5C%3C"); a = a.replace(/\>/g, "%5C%3E"); a = a.replace(/\\/g, "%5C%5C"); a = a.replace(/\'/g, "%5C%27"); a = a.replace(/\"/g, "%5C%22") } return a }; v.filterInvalid = function (a) { if (a != null && a != "" && typeof a == "string") { a = u.trim(a) } return a }; v.isIE = function () { var b = window.navigator.userAgent.toLowerCase(); var a = /msie ([\d\.]+)/; if (a.test(b)) { var c = parseInt(a.exec(b)[1]); return c } return 0 }; function C(c, h) {
        var f = N.yhdStore; if (f && c != "" && c.length > 0) {
            var g = false; var e = 0; for (var b = 0; b < h.length; b++) {
                var a = h[b]; if (a) {
                    if (decodeURIComponent(decodeURIComponent(a)) == decodeURIComponent(decodeURIComponent(c))) {
                        g = true;
                        e = b; break
                    }
                }
            } if (!g) { h.push(c); if (h.length > 10) { h.shift() } } else { if (e != h.length - 1) { var d = h.splice(e, 1); h.push(d[0]) } } f.setFromRoot("search_keyword_history", h.join(","))
        }
    } v.showHistory = function (g, f) {
        if (!z) { return } var b = x.size() > 0 ? x.val() : "0"; var e = u.trim(g.val()); var c = u.trim(g.attr("original")); var a = N.yhdStore; var d = function () {
            var h = w + "/hotWord.do?keyword=&rtnNum=10&callback=?"; u.getJSON(h, function (o) {
                if (o.ERROR) { return } else {
                    if (!o.success) { return } var m = '<div class="hd_search_history_new"><dl class="hd_s_history"></dl><dl class="hd_h_search clearfix"><dt>æ­£åœ¨çƒ­æœä¸­</dt>'; for (var k = 0; k < o.success.length; k++) { var i = o.success[k]; var j = v.filterInvalid(decodeURIComponent(decodeURIComponent(i))); m += "<dd><a href=\"javascript:searchMe('" + v.filterJs(j) + "');\" class='hd_suggest_item'>" + i + "</a></dd>\n" } m += '</dl></div><div class="hd_cleared_searches">å·²æ¸…é™¤è¿‘æœŸæœç´¢è®°å½•</div>';
                    f.html(m); var l; if (a) { a.getFromRoot("search_keyword_history", function (r) { if (r && r.status == 1) { var t = r.value; if (t) { l = t.split(",") } var q = ""; if (typeof (l) != "undefined" && l.length > 0) { q += '<dt><a id="hd_clear_history_record" href="javascript:void(0);" onclick="clearRecord(this);">æ¸…é™¤</a>åŽ†å²è®°å½•</dt>'; for (var p = l.length - 1; p >= 0; p--) { var s = v.filterInvalid(decodeURIComponent(decodeURIComponent(l[p]))); if (s != null && s.length > 0) { q += "<dd>"; q += '<a roll="true" href="javascript:searchMe(\'' + v.filterJs(s) + "');\"   >" + v.filterXml(s) + "</a></dd>" } } } else { q = "<dt>åŽ†å²è®°å½•</dt>" } } else { q = "<dt>åŽ†å²è®°å½•</dt>" } f.find(".hd_s_history").html(q) }) } else { var n = "<dt>åŽ†å²è®°å½•</dt>"; f.find(".hd_s_history").html(n) } f.addClass("hd_search_history"); if (typeof (l) == "undefined" || l.length == 0) { u("#hd_clear_history_record", f).hide() } f.show()
                }
            })
        }; if (e == "" || (e == c && !L)) {
            d()
        }
    }; v.showSuggest = function (b, e) {
        if (!z) { return } var d = x.size() > 0 ? x.val() : "0"; var f = u.trim(b.val()); var a = u.trim(b.attr("original")); var c = function () {
            var g = w + "/smartBox.do?keyword=" + encodeURIComponent(encodeURIComponent(v.filterInvalid(f))) + "&callback=?"; u.getJSON(g, function (l) {
                if (l.ERROR) { return } else {
                    var p = '<ul class="hd_search_tips_list" style="display: block;">'; var j = 10; if (!l.success) { return } try {
                        if (l.currentPromotions && l.currentPromotions.length > 0) {
                            var n = '<li class="search_tip">'; var R = 0; var m = encodeURIComponent(v.filterInvalid(f)); for (var h = 0; h < l.currentPromotions.length; h++) {
                                var r = l.currentPromotions[h]; if (r.smartBoxPCDesc && r.redirectPCUrl) {
                                    var q = r.redirectPCUrl.replace("{keyword}", m); q = N.util.removeUrlHttp(q); n += '<div class="tip_item ss_item" title="' + f + '" onclick="window.location.href=\'' + q + "'; return true;\">";
                                    n += '<a  href="' + q + '" class="tip_item_name">åœ¨<strong class="name">' + r.smartBoxPCDesc + "</strong>ä¸­æœç´¢</a>"; n += "</div>"; R++
                                }
                            } n += "</li>"; if (R > 0) { p += n }
                        }
                    } catch (S) { console.log("å¤§ä¿ƒæœç´¢é”™è¯¯:" + S) } for (var s = 0; s < l.success.length; s++) { var t = l.success[s]; if (t.attrs) { for (var o = 0; o < t.attrs.length; o++) { if (j <= 0) { break } var i = t.attrs[o]; p += '<li class="ss_item"><a onmousedown="searchMe(\'' + t.keyword + " " + i + "');\" href=\"javascript:void(0);\" class='hd_suggest_item'><b>" + t.keyword + "</b>&nbsp;" + i + "</a></li>\n"; j-- } } else { if (j <= 0) { break } p += '<li class="ss_item"><a onmousedown="searchMe(\'' + t.keyword + "');\" href=\"javascript:void(0);\" class='hd_suggest_item' ><b>" + t.keyword + "</b></a></li>\n"; j-- } } p += "</ul>"; e.html(p); e.removeClass("hd_search_history"); var T = e.find("ul>li"); var k = false; T.each(function () {
                        if (u(this).hasClass("haslist")) {
                            k = true
                        }
                    }); if (k) { e.children("ul").css("height", "360px") } e.show(); e.find("ul").show(); require(["header"], function (O) { O.search() })
                }
            })
        }; if ((f != "" && f != a) || (f == a && L)) { c() }
    }; v.registerGlobalEvent = function () {
        u("#site_header").find(".hd_search_wrap").bind("mouseleave", function () { I.hide() }); u(document).bind("click", function (e) { var f = e.target; if (f.id == "hd_clear_history_record" || f.className == "keywordInput" || f.className == "fl") { return } I.hide(); J.hide() }); var b = function (h, f, g) { h = h || window.event; var e = h.keyCode; if (e == "13") { searchMe(f, "0", "0") } }; var c = function (g, k, e) {
            var f = u(".hd_search_form").hasClass("hd_search_fixed"); if (f) { return } g = g || window.event; var i = g.keyCode; if (i == "116" || i == "16" || i == "17" || i == "18" || i == "38" || i == "40" || i == "13") { return } var h = u.trim(k.val()); var j = u.trim(k.attr("original")); if (h == "" || (h == j && !L)) {
                v.delayCall(k, null, function () {
                    v.showHistory(k, e)
                }, 200)
            } else { v.delayCall(k, null, function () { v.showSuggest(k, e) }, 200) }
        }; var d = function (i, l, g) { i = i || window.event; if (i) { var h = document.createElement("input").webkitSpeech === undefined; if (!h) { var j = i.pageX; var f = l.outerWidth(); var m = l.offset().left; var k = m + f - 25; var e = m + f; if (j >= k && j <= e) { return } } } c(i, l, g) }; M.keydown(function (e) { b(e, M, I) }); M.keyup(function (e) { c(e, M, I) }); M.click(function (e) { d(e, M, I) }); y.keydown(function (f) { f = f || window.event; var e = f.keyCode; if (e == "13") { searchMe(y, "0", "0") } }); F.mouseenter(function () { u(this).addClass("hd_serach_tab_hover") }); F.mouseleave(function () { u(this).removeClass("hd_serach_tab_hover") }); F.delegate("a", "click", function () {
            var e = u(this).index(); if (e !== 0) {
                u(this).prependTo(F); F.attr("data-type", u(this).attr("data-type")); F.removeClass("hd_serach_tab_hover"); if (F.attr("data-type") == "2") {
                    F.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCHSHOP").removeAttr("data-tc")
                } else { F.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCH").removeAttr("data-tc") }
            }
        }); var a = function (g, f) { var e = N.yhdStore; e.setFromRoot("search_keyword_history", ""); g.hide(); u(".hd_s_history dd", f).remove() }; I.delegate("#hd_clear_history_record", "click", function () { var e = u(this); a(e, I) }); J.delegate("#hd_clear_history_record", "click", function () { var e = u(this); a(e, J) }); I.delegate("#choose_list dd", "mouseover", function () { u(this).find("#s_cart_btn").show(); return false }); I.delegate("#choose_list dd", "mouseout", function () { u(this).find("#s_cart_btn").hide(); return false }); J.delegate("#choose_list dd", "mouseover", function () { u(this).find("#s_cart_btn").show(); return false }); J.delegate("#choose_list dd", "mouseout", function () { u(this).find("#s_cart_btn").hide(); return false })
    }; v.ssknRefresh = function () {
        var a = function (c) {
            var d = URLPrefix.search_keyword + "/searchWords/tgetUserWords-v1";
            try { u.ajax({ url: d, dataType: "jsonp", cache: true, timeout: 3000, success: function (e) { if (e && e.result && e.result.length > 0) { var f = Math.floor(Math.random() * e.result.length); u(".hd_search_ipt").attr("placeholder", e.result[f].showWord); u(".hd_search_ipt").attr("original", e.result[f].showWord) } } }) } catch (b) { }
        }; if (u(".hd_search_ipt").attr("original") == "") { a("") }
    }; v.loadHotKeywords = function () {
        var a = u.trim(M.val()); var d = u.trim(M.attr("original")); if (u("#hotKeywordsShow").size() == 0) { return } if (!H) { return } var b = function (l) {
            var f = 1; var j = 1; var g = URLPrefix.search_keyword + "/hotWord.do?rtnNum=10"; if ((typeof (a) != "undefined" && a != "" && a != d) || (a == d && L)) { g += "&keyword=" + encodeURIComponent(encodeURIComponent(v.filterInvalid(a))) } var e = u("#curCategoryIdToGlobal").val(); if (typeof (e) != "undefined") { g += "&categoryId=" + e } if (l) {
                g += "&historyKeywords=" + l
            } g += "&provinceId=" + G; g += "&cityId=" + B; var h = u("#hotKeywordsShow"); if (h.data("isLoaded") == "1") { return } h.data("isLoaded", "1"); var k = function (o) { if (D == 1) { var n = h.attr("data-specialHotword"); var m = (typeof globalSpecialHotwordFlag != "undefined" && globalSpecialHotwordFlag == "0") ? 0 : 1; if (m && n) { var p = u.parseJSON(n); if (p && p.text && p.linkUrl) { var q = "<a title='" + p.text + "' href='" + p.linkUrl + "' target='_blank' data-tc='" + (p.tc || "") + "' data-tce='" + (p.tce || "") + "'  data-ref='" + p.perTracker + "'>" + p.text + "</a>"; o = q + o } } } return o }; try {
                u.ajax({
                    url: g, dataType: "jsonp", jsonp: "callback", jsonpCallback: "keywordRecommendCallback", cache: true, timeout: 3000, success: function (t) {
                        if (t && t.success && t.success.length > 0) {
                            var r = t.success; var q = []; for (var s = 0; s < r.length; s++) {
                                var p = r[s]; var n = ""; var o = URLPrefix.search_keyword + "/c0-0/k" + encodeURIComponent(encodeURIComponent(p)) + "/";
                                n = '<a   title="' + p + '" target="_blank" href="' + o + '">' + p + "</a>"; try { if (s == 0 && u("#hotKeywordsShow a:nth-child(1)").length > 0) { n = u("#hotKeywordsShow a:nth-child(1)").prop("outerHTML") } } catch (P) { console.log(P) } q.push(n)
                            } if (q.length > 0) { var m = k(q.join(" ")); h.html("").append(m); h.data("searchKeyLoaded", "1") }
                        }
                    }
                })
            } catch (i) { }
        }; b(""); if (typeof headerType != "undefined" && (headerType == "search" || headerType == "base")) { var c = N.yhdStore; if (c) { c.getFromRoot("search_keyword_history", function (e) { var g = []; if (e && e.status == 1) { var f = e.value; if (f) { g = f.split(",") } } C(a, g) }) } }
    }; v.changeTab = function (a) {
        if (typeof a == "undefined" || isNaN(a) || b == a || (a != "1" && a != "2")) { return } var b = F.attr("data-type"); var c = F.find("a[data-type='" + a + "']"); c.prependTo(F); F.attr("data-type", c.attr("data-type")); F.removeClass("hd_serach_tab_hover"); if (F.attr("data-type") == "2") {
            F.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCHSHOP").removeAttr("data-tc")
        } else { F.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCH").removeAttr("data-tc") }
    }; u(document).ready(function () { v.registerGlobalEvent(); try { var c = JSON.parse(u(".hd_search_ipt").attr("data-sskn")); if (c && c.length > 0) { var a = Math.floor(Math.random() * c.length); u(".hd_search_ipt").attr("placeholder", c[a].text || ""); u(".hd_search_ipt").attr("original", c[a].text || ""); u(".hd_search_ipt").attr("url", c[a].url || "") } } catch (b) { } v.ssknRefresh(); v.loadHotKeywords() })
})(jQuery); function emptySearchBar(i) { if (!i) { i = "#keyword" } var h = $(i); var g = h.parent("div").find("label"); var f = h.attr("original"); var j = h.val(); if (h.val() != "" && g.size() > 0) { g.hide(); h.trigger("click"); return } if (j.indexOf(f) == 0) { h.val(j.substring(f.length)); h.css("color", "#333333") } if (h.val() != "") { h.trigger("click") } } function searchRecommend(b) {
    if (b != null && b != "") {
    window.location = b
    }
} function searchMe(p, r, s, y) {
    var o = "0"; if ($("#leaf").size() > 0) { o = $("#leaf").val() } var n = null; var v = document.getElementById("recommendId"); if (v) { n = v.value } var q = null; var z = document.getElementById("recommendName"); if (z) { q = z.value } var w = $("#keyword"); if (!p) { p = w.val() } else { if (p instanceof jQuery) { w = p; p = w.val() } } if (p != null && p != "") { var u = $.trim(w.attr("original")); if (u != null && u != "") { if (u == p) { var x = w.attr("url"); if (x != null && x != "") { loli.spm.refreshPage(x, w); return } } } } else { var x = w.attr("url"); if (x != null && x != "") { loli.spm.refreshPage(x, w); return } var u = $.trim(w.attr("original")); if (u != null && u != "") { var t = URLPrefix.search_keyword + "/c" + o + "-0/k" + encodeURIComponent(encodeURIComponent(u)) + "/"; loli.spm.refreshPage(t, w); return } } p = $.trim(p); if (!p) { w.val(""); return } if (p == "") { return } if (y) {
        var t = URLPrefix.search_keyword + "/c0-0-0/b/a-s1-v2-p1-price-d0-f0b-m1-rt0-pid-mid0-k" + encodeURIComponent(encodeURIComponent(p)) + "/";
        loli.spm.refreshPage(t, w); return
    } if (r != null && r != "0") { var t = URLPrefix.search_keyword + "/c" + r + "-" + s + "/k" + encodeURIComponent(encodeURIComponent(p)) + "/"; loli.spm.refreshPage(t, w) } else { if (n != null && n != "") { var t = URLPrefix.search_keyword + "/c" + n + "-" + q + "/k" + encodeURIComponent(encodeURIComponent(p)) + "/"; loli.spm.refreshPage(t, w) } else { var t = URLPrefix.search_keyword + "/c" + o + "-0/k" + encodeURIComponent(encodeURIComponent(p)) + "/"; loli.spm.refreshPage(t, w) } }
} function searchMeForClick() { var b = $("#hdSearchTab"); if (b.size() > 0 && b.attr("data-type") == "2") { searchMe(null, null, null, 1); return } searchMe() } function searchInputFocus(i) {
    var j = $("#keyword"); if (i) { j = $(i) } if (j.size() == 0) { return } var f = j.attr("original"); var g = j.val(); var h = (typeof isSearchKeyWords != "undefined" && isSearchKeyWords == "1") ? 1 : 0; if (g == null || g == "") {
        if (f == null || f == "") {
            f = "";
            j.attr("original", f)
        } j.val(f); g = f
    } if (!h) { j.css("color", "#999999"); j.bind("focus", function () { if (this.value == f) { this.value = ""; this.style.color = "#333333" } }).bind("blur", function () { if (this.value == "") { this.value = f; this.style.color = "#999999" } }) } else { j.css("color", "#333333"); j.bind("blur", function () { if (this.value == "") { this.value = f } }) }
} function indexSearchInputFocus() {
    var f = $("#keyword").attr("original"); var e = $("#keyword").val(); var d = $("#keyword").parent("div").find("label"); if (d.size() == 0) { return } if (e == f || e == "") { d.css({ display: "block" }); $("#keyword").css("color", "#333333") } $("#keyword").bind("focus", function () { d.css({ color: "#CCCCCC" }); if (this.value == f) { this.style.color = "#CCCCCC" } else { this.style.color = "#333333" } }).bind("blur", function () {
        if (this.value == "" || this.value == f) {
            d.css({ color: "#666666", display: "block" });
            $("#keyword").val(""); $("#keyword").placeholder("")
        }
    }).bind("keydown", function () { if (this.value == "" || this.value == f) { d.hide() } })
} $(document).ready(function () { if (loli.app.search.isIE() && loli.app.search.isIE() <= 8) { indexSearchInputFocus(); if (typeof isFixTopNav != "undefined" && isFixTopNav == true) { searchInputFocus("#fix_keyword") } } if (typeof headerType != "undefined" && headerType == "search") { $("#fix_keyword").bind("focus", function () { $(this).removeClass("hd_ipt_corner").addClass("focus_ipt") }); $("#fix_keyword").bind("blur", function () { $(this).addClass("hd_ipt_corner").removeClass("focus_ipt") }) } });

