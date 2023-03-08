const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns the literal 0 when an emtpy string is passed", () => {
    const event = "";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("0");
  });

  // TODO: Find out if a string with whitespace should be considered empty.
  it("returns a hash when a string with whitespace is passed", () => {
    const event = " ";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("20b42560b6d0019042ccb5476246e60c66b5a779ff8b36fe6c391d565b816f83eb097a3d997d3a4d31591b54c8064e60b94907d65571766017ef4bdb343b2c2a");
  });

  it("returns a hash for an empty object", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });

  it('returns a hash for an object with a single key', () => {
    const event = { name: "isaac" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("e0b697337c718935d2badab3ac4c1c3be7c013a7004f0c19c832b6b042bdef475105958087bbdaeed7b89631fe26fd18482ea0bf2ca0b8ee4f089cca3e3dde54");
  });

  it('returns a different hash for the same object with a different key order', () => {
    const event = { name: "isaac", age: 32 };
    const trivialKey = deterministicPartitionKey(event);

    const event2 = { age: 32, name: "isaac" };
    const trivialKey2 = deterministicPartitionKey(event2);

    expect(trivialKey).toBe("ff49f7710d625cdc9688c4aeeaec27fc378db337a2037d13558fdf92fffe33f788f646506a7a39abf14977a0c923faed9b5bb39141a9cbe9a93446981bef350f");
    expect(trivialKey2).toBe("a6055a559c7e7683322fba700a31273af103a9ed6ad8a472414932b8a6710bac70631133cb1acde84b8254d06abe0ff58a813a9892eddd24d8d252e7da5f31a8");
  });

  it('returns the partition key if the partition key length is less than 256', () => {
    const event = {partitionKey: "the_key"};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("the_key");
  });

  it('returns a hash if the partition key is greater than 256', () => {
    const event = { partitionKey: "x".repeat(257)};
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe("1ec88d97b4bc830c66b056c760d2deebeac5323f9f9485c65b063299fdbdc446c232fa2a29d221881a68ef8522e8d0bfab7a1c65e02956468a514fc3f2dd0efa");
  });

  it('returns the same hash for the same object input', () => {
    const event = { name: "isaac", age: 32 };
    const trivialKey = deterministicPartitionKey(event);

    const event2 = { name: "isaac", age: 32 };
    const trivialKey2 = deterministicPartitionKey(event2);

    expect(trivialKey).toEqual(trivialKey2);
  });

  it('returns the same hash for the same string input', () => {
    const event = "event";
    const trivialKey = deterministicPartitionKey(event);

    const event2 = "event";
    const trivialKey2 = deterministicPartitionKey(event2);

    expect(trivialKey).toEqual(trivialKey2);
  });

  it('returns the object when partition key is an object', () => {
    const event = { partitionKey: { name: "isaac" } };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe('{"name":"isaac"}');
  });

  it('returns a hash when the strigified object is greater than 256', () => {
    const event = {partitionKey: { name: "isaac".repeat(256), age: 32 }}
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe("1d65c20f227d58280747573f0a9432e22adb41743b1a3fcd598a9b0a9c44e04810f64292449dc17c241a260de4c8841e70b5d15e815f4f935f1c57eef48e160e");
  });

});
