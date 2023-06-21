// Prevcents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[derive(serde::Deserialize, serde::Serialize)]
struct Entry {
    path: String,
    is_directory: bool,
}

impl Entry {
    pub fn new(path: String, is_directory: bool) -> Self {
        Self {
            path,
            is_directory
        }
    }
}

#[tauri::command]
fn read_dir(dir: &str) -> Result<Vec<Entry>, String> {
    let content = std::fs::read_dir(dir).map_err(|_| format!("Could not read directory {}", dir))?;

    let mut entries: Vec<Entry> = vec![];
    for entry in content {
        let entry = entry.unwrap();

        entries.push(Entry::new(entry.path().to_string_lossy().to_string(), entry.file_type().unwrap().is_dir()));
    }

    Ok(entries)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
