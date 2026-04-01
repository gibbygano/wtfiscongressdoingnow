export default interface Action {
  actionCode: string;
  actionDate: string;
  sourceSystem: {
    code: number;
    name: string;
  };
  text: string;
  type: string;
}
