/** @license React v16.6.0-beta.0
 * react-cache.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

if (process.env.NODE_ENV !== "production") {
  (function() {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });

    var React = require("react");

    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warningWithoutStack = function() {};

    {
      warningWithoutStack = function(condition, format) {
        for (
          var _len = arguments.length,
            args = Array(_len > 2 ? _len - 2 : 0),
            _key = 2;
          _key < _len;
          _key++
        ) {
          args[_key - 2] = arguments[_key];
        }

        if (format === undefined) {
          throw new Error(
            "`warningWithoutStack(condition, format, ...args)` requires a warning " +
              "message argument"
          );
        }
        if (args.length > 8) {
          // Check before the condition to catch violations early.
          throw new Error(
            "warningWithoutStack() currently supports at most 8 arguments."
          );
        }
        if (condition) {
          return;
        }
        if (typeof console !== "undefined") {
          var _args$map = args.map(function(item) {
              return "" + item;
            }),
            a = _args$map[0],
            b = _args$map[1],
            c = _args$map[2],
            d = _args$map[3],
            e = _args$map[4],
            f = _args$map[5],
            g = _args$map[6],
            h = _args$map[7];

          var message = "Warning: " + format;

          // We intentionally don't use spread (or .apply) because it breaks IE9:
          // https://github.com/facebook/react/issues/13610
          switch (args.length) {
            case 0:
              console.error(message);
              break;
            case 1:
              console.error(message, a);
              break;
            case 2:
              console.error(message, a, b);
              break;
            case 3:
              console.error(message, a, b, c);
              break;
            case 4:
              console.error(message, a, b, c, d);
              break;
            case 5:
              console.error(message, a, b, c, d, e);
              break;
            case 6:
              console.error(message, a, b, c, d, e, f);
              break;
            case 7:
              console.error(message, a, b, c, d, e, f, g);
              break;
            case 8:
              console.error(message, a, b, c, d, e, f, g, h);
              break;
            default:
              throw new Error(
                "warningWithoutStack() currently supports at most 8 arguments."
              );
          }
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          var argIndex = 0;
          var _message =
            "Warning: " +
            format.replace(/%s/g, function() {
              return args[argIndex++];
            });
          throw new Error(_message);
        } catch (x) {}
      };
    }

    var warningWithoutStack$1 = warningWithoutStack;

    function noop() {}

    var Empty = 0;
    var Pending = 1;
    var Resolved = 2;
    var Rejected = 3;

    // TODO: How do you express this type with Flow?

    var CACHE_TYPE = void 0;
    {
      CACHE_TYPE = 0xcac4e;
    }

    var isCache = void 0;
    {
      isCache = function(value) {
        return (
          value !== null &&
          typeof value === "object" &&
          value.$$typeof === CACHE_TYPE
        );
      };
    }

    // TODO: Make this configurable per resource
    var MAX_SIZE = 500;
    var PAGE_SIZE = 50;

    function createRecord(key) {
      return {
        status: Empty,
        suspender: null,
        key: key,
        value: null,
        error: null,
        next: null,
        previous: null
      };
    }

    function createRecordCache() {
      return {
        map: new Map(),
        head: null,
        tail: null,
        size: 0
      };
    }

    function createCache(invalidator) {
      var resourceMap = new Map();

      function accessRecord(resourceType, key) {
        {
          !(
            typeof resourceType !== "string" && typeof resourceType !== "number"
          )
            ? warningWithoutStack$1(
                false,
                "Invalid resourceType: Expected a symbol, object, or function, but " +
                  "instead received: %s. Strings and numbers are not permitted as " +
                  "resource types.",
                resourceType
              )
            : void 0;
        }

        var recordCache = resourceMap.get(resourceType);
        if (recordCache === undefined) {
          recordCache = createRecordCache();
          resourceMap.set(resourceType, recordCache);
        }
        var map = recordCache.map;

        var record = map.get(key);
        if (record === undefined) {
          // This record does not already exist. Create a new one.
          record = createRecord(key);
          map.set(key, record);
          if (recordCache.size >= MAX_SIZE) {
            // The cache is already at maximum capacity. Remove PAGE_SIZE least
            // recently used records.
            // TODO: We assume the max capcity is greater than zero. Otherwise warn.
            var _tail = recordCache.tail;
            if (_tail !== null) {
              var newTail = _tail;
              for (var i = 0; i < PAGE_SIZE && newTail !== null; i++) {
                recordCache.size -= 1;
                map.delete(newTail.key);
                newTail = newTail.previous;
              }
              recordCache.tail = newTail;
              if (newTail !== null) {
                newTail.next = null;
              }
            }
          }
        } else {
          // This record is already cached. Remove it from its current position in
          // the list. We'll add it to the front below.
          var _previous = record.previous;
          var _next = record.next;
          if (_previous !== null) {
            _previous.next = _next;
          } else {
            recordCache.head = _next;
          }
          if (_next !== null) {
            _next.previous = _previous;
          } else {
            recordCache.tail = _previous;
          }
          recordCache.size -= 1;
        }

        // Add the record to the front of the list.
        var head = recordCache.head;
        var newHead = record;
        recordCache.head = newHead;
        newHead.previous = null;
        newHead.next = head;
        if (head !== null) {
          head.previous = newHead;
        } else {
          recordCache.tail = newHead;
        }
        recordCache.size += 1;

        return newHead;
      }

      function load(emptyRecord, suspender) {
        var pendingRecord = emptyRecord;
        pendingRecord.status = Pending;
        pendingRecord.suspender = suspender;
        suspender.then(
          function(value) {
            // Resource loaded successfully.
            var resolvedRecord = pendingRecord;
            resolvedRecord.status = Resolved;
            resolvedRecord.suspender = null;
            resolvedRecord.value = value;
          },
          function(error) {
            // Resource failed to load. Stash the error for later so we can throw it
            var rejectedRecord = pendingRecord;
            rejectedRecord.status = Rejected;
            rejectedRecord.suspender = null;
            rejectedRecord.error = error;
          }
        );
      }

      var cache = {
        invalidate: function() {
          invalidator();
        },
        preload: function(resourceType, key, miss, missArg) {
          var record = accessRecord(resourceType, key);
          switch (record.status) {
            case Empty:
              // Warm the cache.
              var _suspender = miss(missArg);
              load(record, _suspender);
              return;
            case Pending:
              // There's already a pending request.
              return;
            case Resolved:
              // The resource is already in the cache.
              return;
            case Rejected:
              // The request failed.
              return;
          }
        },
        read: function(resourceType, key, miss, missArg) {
          var record = accessRecord(resourceType, key);
          switch (record.status) {
            case Empty:
              // Load the requested resource.
              var _suspender2 = miss(missArg);
              load(record, _suspender2);
              throw _suspender2;
            case Pending:
              // There's already a pending request.
              throw record.suspender;
            case Resolved:
              return record.value;
            case Rejected:
            default:
              // The requested resource previously failed loading.
              var _error = record.error;
              throw _error;
          }
        }
      };

      {
        cache.$$typeof = CACHE_TYPE;
      }
      return cache;
    }

    var warnIfNonPrimitiveKey = void 0;
    {
      warnIfNonPrimitiveKey = function(key, methodName) {
        !(
          typeof key === "string" ||
          typeof key === "number" ||
          typeof key === "boolean" ||
          key === undefined ||
          key === null
        )
          ? warningWithoutStack$1(
              false,
              "%s: Invalid key type. Expected a string, number, symbol, or boolean, " +
                "but instead received: %s" +
                "\n\nTo use non-primitive values as keys, you must pass a hash " +
                "function as the second argument to createResource().",
              methodName,
              key
            )
          : void 0;
      };
    }

    // These declarations are used to express function overloading. I wish there
    // were a more elegant way to do this in the function definition itself.

    // Primitive keys do not request a hash function.

    // Non-primitive keys *do* require a hash function.
    // eslint-disable-next-line no-redeclare

    // eslint-disable-next-line no-redeclare
    function createResource(loadResource, hash) {
      var resource = {
        read: function(cache, key) {
          {
            !isCache(cache)
              ? warningWithoutStack$1(
                  false,
                  "read(): The first argument must be a cache. Instead received: %s",
                  cache
                )
              : void 0;
          }
          if (hash === undefined) {
            {
              warnIfNonPrimitiveKey(key, "read");
            }
            return cache.read(resource, key, loadResource, key);
          }
          var hashedKey = hash(key);
          return cache.read(resource, hashedKey, loadResource, key);
        },
        preload: function(cache, key) {
          {
            !isCache(cache)
              ? warningWithoutStack$1(
                  false,
                  "preload(): The first argument must be a cache. Instead received: %s",
                  cache
                )
              : void 0;
          }
          if (hash === undefined) {
            {
              warnIfNonPrimitiveKey(key, "preload");
            }
            cache.preload(resource, key, loadResource, key);
            return;
          }
          var hashedKey = hash(key);
          cache.preload(resource, hashedKey, loadResource, key);
        }
      };
      return resource;
    }

    // Global cache has no eviction policy (except for, ya know, a browser refresh).
    var globalCache = createCache(noop);
    var ReactCache = React.createContext(globalCache);

    exports.createCache = createCache;
    exports.createResource = createResource;
    exports.ReactCache = ReactCache;
  })();
}
