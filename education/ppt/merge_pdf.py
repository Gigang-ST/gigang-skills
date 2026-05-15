"""챕터 PDF들을 하나로 합침. 사용: uv run --no-project --with pymupdf python merge_pdf.py"""
import sys, os
import fitz

sys.stdout.reconfigure(encoding="utf-8")

ORDER = [
    "01-why",
    "02-concepts",
    "03-setup",
    "04-usage",
    "05-security",
    "06-gigang",
    "appendix",
]

OUT_DIR = os.path.join(os.path.dirname(__file__), "output")
OUT = os.path.join(OUT_DIR, "gigang-skills-all-new.pdf")

merged = fitz.open()
for ch in ORDER:
    pdf = os.path.join(OUT_DIR, f"{ch}.pdf")
    if not os.path.exists(pdf):
        print(f"⚠ 누락: {pdf}")
        continue
    doc = fitz.open(pdf)
    merged.insert_pdf(doc)
    print(f"+ {ch}: {len(doc)} pages")
    doc.close()

merged.save(OUT)
print(f"✓ {OUT}  ({len(merged)} pages)")
merged.close()
