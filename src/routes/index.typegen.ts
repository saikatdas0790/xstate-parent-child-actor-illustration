// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    spawnChild: "SPAWN_CHILD";
    logCurrentStateToConsole: "xstate.after(3000)#(machine).waiting";
  };
  internalEvents: {
    "xstate.after(3000)#(machine).waiting": {
      type: "xstate.after(3000)#(machine).waiting";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "waiting";
  tags: never;
}
