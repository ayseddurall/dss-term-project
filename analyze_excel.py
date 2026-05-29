import pandas as pd
import json

file_path = 'real_estate_dss_tamamlanmis.xlsx'
xls = pd.ExcelFile(file_path)

summary = {}
summary['sheet_names'] = xls.sheet_names

for sheet in xls.sheet_names:
    df = pd.read_excel(xls, sheet_name=sheet)
    sheet_info = {
        'columns': list(df.columns),
        'row_count': len(df),
        'sample_data': df.head(3).to_dict(orient='records')
    }
    # check if there are columns like mean, sum, min, max (summary stats)
    summary[sheet] = sheet_info

with open('excel_summary.json', 'w', encoding='utf-8') as f:
    json.dump(summary, f, ensure_ascii=False, indent=4)

print("Excel analysis complete. Saved to excel_summary.json.")
