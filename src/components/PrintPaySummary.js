import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { formatPrice } from "../helpers/Utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { payrunState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";

const PrintPDFTest = ({ singlebatchpayslip }) => {
  const period = singlebatchpayslip[0].period;
  const subtitle = `Payroll Summary for the period  ${period}`;
  const names = singlebatchpayslip.map((r) => {
    return r.name;
  });
  const wages = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.wages);
    return amount;
  });
  const tapamount = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.tap_amount);
    return amount;
  });
  const scpamount = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.scp_amount);
    return amount;
  });
  const allowsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.total_allowances);
    return amount;
  });
  const deductsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.total_deductions);
    return amount;
  });
  const nettpay = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.nett_pay);
    return amount;
  });
  const totalwages = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.wages;
  }, 0);
  const totaltap = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.tap_amount;
  }, 0);
  const totalscp = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.scp_amount;
  }, 0);
  const totalallows = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.total_allowances;
  }, 0);
  const totaldeducts = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.total_deductions;
  }, 0);
  const totalnettpay = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.nett_pay;
  }, 0);
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: [
      { text: "AppSmith Sutera Sdn Bhd", style: "header" },
      { text: subtitle, style: "subheader" },

      {
        style: "tableExample",
        table: {
          widths: [150, 80, 80, 80, 80, 80, 80],
          body: [
            [
              "Name",
              { alignment: "right", text: "Wages" },
              { alignment: "right", text: "TAP Amount" },
              { alignment: "right", text: "SCP Amount" },
              { alignment: "right", text: "Allowances" },
              { alignment: "right", text: "Deductions" },
              { alignment: "right", text: "Nett Pay" },
            ],
            [
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    ul: names,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: wages,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: tapamount,
                  },
                ],
              },

              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: scpamount,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: allowsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: deductsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: nettpay,
                  },
                ],
              },
            ],
            [
              "",
              { alignment: "right", text: formatPrice(totalwages) },
              { alignment: "right", text: formatPrice(totaltap) },
              { alignment: "right", text: formatPrice(totalscp) },
              { alignment: "right", text: formatPrice(totalallows) },
              { alignment: "right", text: formatPrice(totaldeducts) },
              { alignment: "right", text: formatPrice(totalnettpay) },
            ],
          ],
        },
      },
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

export default PrintPDFTest;
