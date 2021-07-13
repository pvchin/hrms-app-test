import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { formatPrice } from "../helpers/Utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { payrunState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployees } from "./employees/useEmployees";

const PrintPayslip = ({ data, emp }) => {
  console.log("payslip", data);
  console.log("payslip emp", emp);
  const subtitle = "Payslips for the period " + data.rowData.period;
  const { empno, address, phone } = emp[0];
  const { name, total_allowances, total_deductions } = data.rowData;
  const totalEarnings = data.rowData.wages + data.rowData.total_allowances;
  const totalDeductions =
    data.rowData.tap_amount +
    data.rowData.scp_amount +
    data.rowData.total_deductions;
  const earningsdesp = [
    "Wages",
    data.rowData.allows_type1,
    data.rowData.allows_type2,
    data.rowData.allows_type3,
    data.rowData.allows_type4,
    data.rowData.allows_type5,
    data.rowData.allows_type6,
    data.rowData.allows_type7,
    data.rowData.allows_type8,
  ];
  const earningsamt = [
    formatPrice(data.rowData.wages),
    formatPrice(data.rowData.allows_type1amt),
    formatPrice(data.rowData.allows_type2amt),
    formatPrice(data.rowData.allows_type3amt),
    formatPrice(data.rowData.allows_type4amt),
    formatPrice(data.rowData.allows_type5amt),
    formatPrice(data.rowData.allows_type6amt),
    formatPrice(data.rowData.allows_type7amt),
    formatPrice(data.rowData.allows_type8amt),
  ];
  const deductionsdesp = [
    "TAP Amount",
    "SCP Amount",
    data.rowData.deducts_type1,
    data.rowData.deducts_type2,
    data.rowData.deducts_type3,
    data.rowData.deducts_type4,
    data.rowData.deducts_type5,
    data.rowData.deducts_type6,
    data.rowData.deducts_type7,
    data.rowData.deducts_type8,
  ];
  const deductionsamt = [
    formatPrice(parseInt(data.rowData.tap_amount, 10)),
    formatPrice(parseInt(data.rowData.scp_amount, 10)),
    formatPrice(data.rowData.deducts_type1amt),
    formatPrice(data.rowData.deducts_type2amt),
    formatPrice(data.rowData.deducts_type3amt),
    formatPrice(data.rowData.deducts_type4amt),
    formatPrice(data.rowData.deducts_type5amt),
    formatPrice(data.rowData.deducts_type6amt),
    formatPrice(data.rowData.deducts_type7amt),
    formatPrice(data.rowData.deducts_type8amt),
  ];

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: [
      // {
      //   image: "logo",
      //   width: 200,
      // },
      { text: "AppSmith Sutera Sdn Bhd", style: "header" },
      { text: subtitle + "\n\n", style: "subheader" },
      // {
      //   style: "tableExample",
      //   table: {
      //     body: [
      //     { text: "Emp No: " + empno + "\n", style: "text" },
      //       { text: "Name: " + name + "\n", style: "text" },
      //       { text: "Addess: " + address + "\n", style: "text" },
      //     { text: "Phone: " + phone + "\n", style: "text" },
      //     ],
      //   },
      // },
      // {
      //   columns: [
      //     { width: 80, text: "Emp No", style: "text" },
      //     { width: "auto",text: empno + "\n", style: "Text"}
      //   ]
      // },
      {
        text: [
          { text: "Emp No : " + empno + "\n", style: "text" },
          { text: "Name   : " + name + "\n", style: "text" },
          { text: "Addess : " + address + "\n", style: "text" },
          { text: "Phone  : " + phone + "\n\n", style: "text" },
        ],
      },

      {
        style: "tableExample",
        table: {
          widths: [200, 80, 200, 80],
          body: [
            [
              { alignment: "left", text: "Earnings" },
              { alignment: "right", text: "Amount" },
              { alignment: "left", text: "Deductions" },
              { alignment: "right", text: "Amount" },
            ],
            [
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    ul: earningsdesp,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: earningsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    ul: deductionsdesp,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: deductionsamt,
                  },
                ],
              },
            ],
            [
              { alignment: "left", text: "Total Earnings" },
              { alignment: "right", text: formatPrice(totalEarnings) },
              { alignment: "left", text: "Total Deductions" },
              { alignment: "right", text: formatPrice(totalDeductions) },
            ],
            [
              { alignment: "left", text: "" },
              { alignment: "right", text: "" },
              { alignment: "left", text: "NettPay" },
              { alignment: "right", text: formatPrice(data.rowData.nett_pay) },
            ],
          ],
        },
      },
      // {
      //   style: "tableExample",
      //   table: {
      //     widths: [480, 80],
      //     body: [
      //       [
      //         { alignment: "left", text: "Nettpay" },
      //         { alignment: "right", text: "Amount" },
      //       ],
      //     ],
      //   },
      // },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      text: {
        fontSize: 12,
        bold: false,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: "blue",
        fillOpacity: 0.3,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default PrintPayslip;
