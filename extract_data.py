import pandas as pd
import json

file_path = 'real_estate_dss_tamamlanmis.xlsx'
xls = pd.ExcelFile(file_path)

# Dashboard
df_dashboard = pd.read_excel(xls, sheet_name='dashboard', header=None)
dashboard_data = df_dashboard.head(10).fillna("").to_dict(orient='records')

# Decision Model
df_decision = pd.read_excel(xls, sheet_name='decision_model', header=None)
decision_data = df_decision.head(30).fillna("").to_dict(orient='records')

# Processed Data
df_processed = pd.read_excel(xls, sheet_name='processed_data')
sample_data = df_processed.head(100).fillna("").to_dict(orient='records')
segment_counts = df_processed['fiyat_segmenti'].value_counts().to_dict()

# Calculate average price per city
city_avg_prices = df_processed.groupby('il')['fiyat'].mean().round(2).to_dict()

output = {
    "dashboard_raw": dashboard_data,
    "decision_raw": decision_data,
    "sample_listings": sample_data,
    "segment_counts": segment_counts,
    "total_listings_count": len(df_processed),
    "city_avg_prices": city_avg_prices
}

with open('app_data.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=4)

print("Data extracted to app_data.json successfully.")
