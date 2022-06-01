import Id from "../../@shared/domain/value-object/id.value-object";
import Customer from "./customer.entity";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: "" as unknown as Id,
        name: "John",
        phone: "123",
        updatedAt: new Date(),
        createdAt: new Date()
      });
    }).toThrowError("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: new Id("123"),
        name: "",
        phone: "123",
      });
    }).toThrowError("customer: Name is required");
  });

  it("should throw error when name is and id are empty", () => {
    expect(() => {
      let customer = new Customer({ id: "" as unknown as Id, name: "", phone: "123" });
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer({
      id: new Id("123"),
      name: "John",
      phone: "123",
    });

    // Act
    customer.changeName("Jane");
    customer.changePhone("changed");

    // Assert
    expect(customer.name).toBe("Jane");
    expect(customer.phone).toBe("changed");
  });
});
