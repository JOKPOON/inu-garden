import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  TableLayoutType,
} from "docx";
import { saveAs } from "file-saver";

const pos = {
  "01JTX94BF86285ABZBENVNYZJV": {
    POID: "01JTX94BF86285ABZBENVNYZJV",
    POCode: "PO1",
    PassedPercentage: 100,
    ExpectedPassingCloPercentage: 50,
    CLOPassingRate: {
      "01JTX963ANM2TDGEAWJ7ZQ0FS0": {
        CLOID: "01JTX963ANM2TDGEAWJ7ZQ0FS0",
        CLOCode: "CLO1",
        PassedPercentage: 0,
        ExpectedPassingAssignmentPercentage: 65,
        Assignments: {
          "01JV1MZECBKFJ3Y14ZSATYEMMC": {
            AssignmentID: "01JV1MZECBKFJ3Y14ZSATYEMMC",
            AssignmentName: "Final Exam",
            PassedPercentage: 66.66666666666666,
            ExpectedPassingAssignmentPercentage: 65,
          },
          "01JV2DF7Q0YKYEZWXR37WDT1BJ": {
            AssignmentID: "01JV2DF7Q0YKYEZWXR37WDT1BJ",
            AssignmentName: "Assignment",
            PassedPercentage: 0,
            ExpectedPassingAssignmentPercentage: 65,
          },
        },
      },
      "01JTX980RA634V7Y1DGFAEXPP7": {
        CLOID: "01JTX980RA634V7Y1DGFAEXPP7",
        CLOCode: "CLO2",
        PassedPercentage: 100,
        ExpectedPassingAssignmentPercentage: 75,
        Assignments: {
          "01JTXC7B17P12ZFMBM3JN55TFB": {
            AssignmentID: "01JTXC7B17P12ZFMBM3JN55TFB",
            AssignmentName: "Midterm Exam",
            PassedPercentage: 100,
            ExpectedPassingAssignmentPercentage: 75,
          },
        },
      },
    },
  },
  "01JTX94BF86285ABZBESR9ZDEM": {
    POID: "01JTX94BF86285ABZBESR9ZDEM",
    POCode: "PO2",
    PassedPercentage: 0,
    ExpectedPassingCloPercentage: 50,
    CLOPassingRate: {
      "01JTX963ANM2TDGEAWJ7ZQ0FS0": {
        CLOID: "01JTX963ANM2TDGEAWJ7ZQ0FS0",
        CLOCode: "CLO1",
        PassedPercentage: 0,
        ExpectedPassingAssignmentPercentage: 65,
        Assignments: {
          "01JV1MZECBKFJ3Y14ZSATYEMMC": {
            AssignmentID: "01JV1MZECBKFJ3Y14ZSATYEMMC",
            AssignmentName: "Final Exam",
            PassedPercentage: 66.66666666666666,
            ExpectedPassingAssignmentPercentage: 65,
          },
          "01JV2DF7Q0YKYEZWXR37WDT1BJ": {
            AssignmentID: "01JV2DF7Q0YKYEZWXR37WDT1BJ",
            AssignmentName: "Assignment",
            PassedPercentage: 0,
            ExpectedPassingAssignmentPercentage: 65,
          },
        },
      },
    },
  },
};

export async function generateDocx(data) {
  const section = [];

  // Header
  section.push(
    new Paragraph({
      text: `รายวิชา: ${data.course_name}`,
      heading: HeadingLevel.HEADING_1,
    })
  );

  section.push(
    new Paragraph({
      text: `ผู้สอน: ${data.lecturers}`,
      heading: HeadingLevel.HEADING_2,
    })
  );

  section.push(new Paragraph(" "));

  // Implementation
  section.push(
    new Paragraph({
      text: "1. สรุปการดำเนินงาน",
      heading: HeadingLevel.HEADING_2,
    })
  );
  section.push(
    new Paragraph({
      text: "1.1 การสอน",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  data.implementation.methods.forEach((method, i) => {
    section.push(
      new Paragraph({
        text: `1.1.${i + 1}. ${method}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "1.2 ระบบออนไลน์",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );
  data.implementation.online_media.forEach((m, i) => {
    section.push(
      new Paragraph({
        text: `1.2.${i + 1}. ${m}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "1.3 วัตถุประสงค์การสอน",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  data.implementation.teaching_objectives.forEach((o, i) => {
    section.push(
      new Paragraph({
        text: `1.3.${i + 1}. ${o}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(new Paragraph(" "));

  // Education Outcomes
  section.push(
    new Paragraph({ text: "2. ผลการศึกษา", heading: HeadingLevel.HEADING_2 })
  );
  section.push(
    new Paragraph({
      text: "2.1 เกรด",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  //   section.push(new Paragraph("รูป 2.1 เกรด"));

  //   // Insert Chart Image
  //   section.push(
  //     new Paragraph({
  //       children: [
  //         new ImageRun({
  //           data: chartImageBase64,
  //           transformation: {
  //             width: 500,
  //             height: 250,
  //           },
  //         }),
  //       ],
  //     })
  //   );

  // Grade Distribution Table
  const gradeStats = data.education_outcomes.grade_distribution;

  section.push(
    new Paragraph({
      text: "ตาราง 2.1 Grade Distribution",
      heading: HeadingLevel.HEADING_3,
      indent: { left: 800 },
    })
  );

  const tableRows = [];
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Number of Students")],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph(String(gradeStats.student_amount))],
        }),
      ],
    })
  );
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Average GPA")],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph(String(gradeStats.gpa))],
        }),
      ],
    })
  );
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Grade")],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Score Range")],
        }),
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Frequency")],
        }),
      ],
    })
  );

  gradeStats.grade_frequencies.forEach((g) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(g.name)],
          }),
          new TableCell({
            children: [new Paragraph(`≥ ${g.grade_score}`)],
          }),
          new TableCell({
            children: [new Paragraph(`${g.frequency}`)],
          }),
        ],
      })
    );
  });

  section.push(
    new Table({
      rows: tableRows,
      width: { size: 60, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
      layout: TableLayoutType.AUTOFIT,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideHorizontal: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      },
    })
  );

  section.push(new Paragraph(" "));

  //   atableRows = [];

  //   atableRows.push(
  //     new TableRow({
  //       children: [
  //         new TableCell({
  //           width: { size: 20, type: WidthType.PERCENTAGE },
  //           children: [new Paragraph("PO")],
  //         }),
  //         new TableCell({
  //           width: { size: 30, type: WidthType.PERCENTAGE },
  //           children: [new Paragraph("Course Learning Outcomes")],
  //         }),
  //         new TableCell({
  //           width: { size: 20, type: WidthType.PERCENTAGE },
  //           children: [new Paragraph("Assessment Tasks")],
  //         }),
  //         new TableCell({
  //           width: { size: 10, type: WidthType.PERCENTAGE },
  //           children: [new Paragraph("Passing Criteria (%)")],
  //         }),
  //         new TableCell({
  //           width: { size: 20, type: WidthType.PERCENTAGE },
  //           children: [new Paragraph("Percentage of Students with PASS outcome")],
  //         }),
  //       ],
  //     })
  //   );
  section.push(
    new Paragraph({
      text: "2.2 ผลลัพธ์การศึกษาของหลักสูตร (Program Outcomes: PO / Course Learning Outcomes: CLO)",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  section.push(
    new Paragraph({
      text: "ตาราง 2.2 ผลการประเมิน TABEE Outcome",
      heading: HeadingLevel.HEADING_3,
      indent: { left: 800 },
    })
  );

  const outcomeRows = [];
  outcomeRows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          children: [new Paragraph("PO")],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph("PO Passing (%)")],
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          children: [new Paragraph("CLO Code")],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph("CLO Passing (%)")],
        }),
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Assignment Name")],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Assignment Passing (%)")],
        }),
      ],
    })
  );

  Object.values(pos).forEach((po) => {
    const poCode = po.POCode;
    const poPassed = po.PassedPercentage;

    const cloList = Object.values(po.CLOPassingRate);
    cloList.forEach((clo, cloIndex) => {
      const cloCode = clo.CLOCode;
      const cloPassed = clo.PassedPercentage;

      const assignments = Object.values(clo.Assignments);
      assignments.forEach((assignment, assignIndex) => {
        const rowCells = [];

        // PO Cells - only on first CLO & Assignment of the PO
        if (cloIndex === 0 && assignIndex === 0) {
          rowCells.push(
            new TableCell({
              rowSpan: cloList.reduce(
                (acc, c) => acc + Object.values(c.Assignments).length,
                0
              ),
              children: [new Paragraph(poCode)],
            }),
            new TableCell({
              rowSpan: cloList.reduce(
                (acc, c) => acc + Object.values(c.Assignments).length,
                0
              ),
              children: [new Paragraph(String(poPassed))],
            })
          );
        }

        // CLO Cells - only on first assignment of this CLO
        if (assignIndex === 0) {
          rowCells.push(
            new TableCell({
              rowSpan: Object.values(clo.Assignments).length,
              children: [new Paragraph(cloCode)],
            }),
            new TableCell({
              rowSpan: Object.values(clo.Assignments).length,
              children: [new Paragraph(String(cloPassed))],
            })
          );
        }

        // Assignment cells
        rowCells.push(
          new TableCell({
            children: [new Paragraph(assignment.AssignmentName)],
          }),
          new TableCell({
            children: [
              new Paragraph(assignment.PassedPercentage.toFixed(2) + "%"),
            ],
          })
        );

        outcomeRows.push(new TableRow({ children: rowCells }));
      });
    });
  });

  section.push(
    new Table({
      rows: outcomeRows,
      width: { size: 80, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
      layout: TableLayoutType.AUTOFIT,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideHorizontal: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
        insideVertical: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
      },
    })
  );

  section.push(new Paragraph(" "));

  section.push(
    new Paragraph({
      text: "3. การพัฒนาต่อเนื่อง",
      heading: HeadingLevel.HEADING_2,
    })
  );

  section.push(
    new Paragraph({
      text: "3.1 แนวทางการพัฒนาจากรอบที่แล้ว (Plan)",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  data.implementation.methods.forEach((method, i) => {
    section.push(
      new Paragraph({
        text: `3.1.${i + 1}. ${method}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "3.2 การพัฒนาและปัญหาหลัก (Do & Check)",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  data.implementation.methods.forEach((method, i) => {
    section.push(
      new Paragraph({
        text: `3.2.${i + 1}. ${method}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "3.3 แนวทางการปรับปรุงหลักในรอบหน้า (Act)",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  data.implementation.methods.forEach((method, i) => {
    section.push(
      new Paragraph({
        text: `3.3.${i + 1}. ${method}`,
        indent: { left: 800 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "3.4 ความเห็นสำหรับวิชาอื่น",
      heading: HeadingLevel.HEADING_3,
      indent: {
        left: 400,
      },
    })
  );

  section.push(
    new Paragraph({
      text: "วิชา Upstream",
      indent: { left: 800 },
    })
  );

  data.continuous_development.feedbacks.upstream_subjects.forEach((f) => {
    section.push(
      new Paragraph({
        text: `- ${f.course_code} ${f.course_name}`,
        indent: { left: 1200 },
      })
    );
    section.push(
      new Paragraph({
        text: `  ${f.comment}`,
        indent: { left: 1200 },
      })
    );
    section.push(
      new Paragraph({
        text: `  โดย ${f.sender}`,
        indent: { left: 1200 },
      })
    );
  });

  section.push(
    new Paragraph({
      text: "วิชา Downstream",
      indent: { left: 800 },
    })
  );

  data.continuous_development.feedbacks.downstream_subjects.forEach((f) => {
    section.push(
      new Paragraph({
        text: `- ${f.course_code} ${f.course_name}`,
        indent: { left: 1200 },
      })
    );
    section.push(
      new Paragraph({
        text: `  ${f.comment}`,
        indent: { left: 1200 },
      })
    );
    section.push(
      new Paragraph({
        text: `  โดย ${f.sender}`,
        indent: { left: 1200 },
      })
    );
  });

  // Create Word doc
  const docx = new Document({
    sections: [
      {
        properties: {},
        children: section,
      },
    ],
  });

  const blob = await Packer.toBlob(docx);
  saveAs(blob, "report.docx");
}
