import ListQueryInput from "./ListQueryInput";

export default interface ListQueryInterface {
    handle(input: ListQueryInput): Promise<any>;
}
