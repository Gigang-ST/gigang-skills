import fitz
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "output", "gigang-v2")
ORDER = ["01-gpt-vs-cc", "02-setup", "03-init", "04-commands", "05-token", "06-practice", "07-gigang", "appendix"]

merged = fitz.open()
for name in ORDER:
    pdf_path = os.path.join(OUT_DIR, f"{name}.pdf")
    if os.path.exists(pdf_path):
        doc = fitz.open(pdf_path)
        pages = doc.page_count
        merged.insert_pdf(doc)
        doc.close()
        print(f"✓ {name}.pdf ({pages} pages)")
    else:
        print(f"✗ missing: {pdf_path}")

out_path = os.path.join(OUT_DIR, "gigang-education-all-v2.pdf")
merged.save(out_path)
merged.close()
print(f"\nDone → {out_path}")
