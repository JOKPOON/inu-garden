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
