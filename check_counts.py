import pandas as pd

file_path = 'real_estate_dss_tamamlanmis.xlsx'
xls = pd.ExcelFile(file_path)

df_decision = pd.read_excel(xls, 'decision_model', header=1)
# Column 4 is "İlan Sayısı"
col_name = df_decision.columns[3]
total_in_decision = df_decision[col_name].sum()

df_processed = pd.read_excel(xls, 'processed_data')
total_in_processed = len(df_processed)

print("Total in decision model:", total_in_decision)
print("Total in processed data:", total_in_processed)
