import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export const generateLeasePdf = async (
  details: LeaseDetails
): Promise<string> => {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();

  const text = `LEASE AGREEMENT
    --------------------
    Tenant Name: ${details.fullName}
    Property Address: ${details.propertyNo}
    Move-in Date: ${details.moveInDate}
    Monthly Rent: ${details.rentAmount}

    Terms and Conditions:
    - Rent is due on the 10th of every month.
    - The tenant agrees to maintain the premises.
    - The landlord reserves the right to inspect the property with prior notice.`;

  page.drawText(text, {
    x: 50,
    y: height - 100,
    size: 14,
    font,
    color: rgb(0, 0, 0),
    lineHeight: 20,
  });

  //save
  const pdfBytes = await pdfDoc.save();

  const pdfFilePath = path.join(
    process.cwd(),
    "public/contracts",
    `lease-${details.fullName.replace(/\s+/g, "_")}.pdf`
  );
  fs.mkdirSync(path.dirname(pdfFilePath), { recursive: true });

  fs.writeFileSync(pdfFilePath, pdfBytes);

  return pdfFilePath;
};
