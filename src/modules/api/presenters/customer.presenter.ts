import { toXML } from "jstoxml";
import { FindAllCustomerOutputDto } from "../../customer/usecase/retrieve/findAll/findAll-customer.dto";

export default class CustomerPresenter {
  static listXML(data: FindAllCustomerOutputDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customer: data.map((customer) => ({
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
        })),
      },
      xmlOption
    );
  }
}
