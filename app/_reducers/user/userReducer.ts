/* eslint-disable-next-line */
export function reducer(state: any, action: any) {
  switch (action.type) {
    case "set-user":
      return { ...state, user: action.payload };
    case "remove-user":
      return { ...state, user: null };
    case "set-loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
