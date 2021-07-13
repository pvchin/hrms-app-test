import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

const PrintPDFTest = () => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "potrait",
    content: [
      {
        text: "Payroll Summary\n\n",
        style: "header",
      },
      {
        text: [
          "It is however possible to provide an array of texts ",
          "to the paragraph (instead of a single string) and have",
          { text: "a better", fontSize: 15, bold: true },
          "control over it. \nEach inline can be",
          { text: "styled", fontSize: 20 },
          { text: "independently", italic: true, fontSize: 40 },
          "then. \n\n",
        ],
      },
      {
        style: "bigger",
        italic: false,
        text: [
          "We can also mix named-styles and style-overrides at both paragraph and inline level.",
          'For example, this paragraph uses the "bigger" style, which changes fontSize to 15 and sets italics to true.',
          "Texts are not italics though. it's because we've overriden italics back to false at",
          "the paragraph level. \n\n",
          "We can also change the style of a single inline. Let's use a named style called header:",
          { text: "like here \n", style: "header" },
          "it got bigger and bold. \n\n",
        ],
      },
      { text: "Tables", style: "header" },
      { text: "Column/row spans", pageBreak: "before", style: "subheader" },
      "Each cell-element can set a rowSpan or colSpan",
      {
        style: "tableExample",
        color: "#444",
        table: {
          widths: [200, "auto", "auto"],
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [
            [
              {
                text: "Header with Colspan = 2",
                style: "tableHeader",
                colSpan: 2,
                alignment: "center",
              },
              {},
              { text: "Header 3", style: "tableHeader", alignment: "center" },
            ],
            [
              { text: "Header 1", style: "tableHeader", alignment: "center" },
              { text: "Header 2", style: "tableHeader", alignment: "center" },
              { text: "Header 3", style: "tableHeader", alignment: "center" },
            ],
            ["Sample value 1", "Sample value 2", "Sample value 3"],
            [
              {
                rowSpan: 3,
                text: "rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
              },
              "Sample value 2",
              "Sample value 3",
            ],
            ["", "Sample value 2", "Sample value 3"],
            ["Sample value 1", "Sample value 2", "Sample value 3"],
            [
              "Sample value 1",
              {
                colSpan: 2,
                rowSpan: 2,
                text: "Both:\nrowSpan and colSpan\ncan be defined at the same time",
              },
              "",
            ],
            ["Sample value 1", "", ""],
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
