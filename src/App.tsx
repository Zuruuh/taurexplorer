import { createEffect, createSignal, For, Show } from 'solid-js';
import { readDir } from './actions/readDir';
import { Entry } from './schema/EntrySchema';

function App() {
  const [directory, setDirectory] = createSignal('/');
  const [entries, setEntries] = createSignal<Entry[]>([]);

  async function readdir() {
    setEntries(await readDir(directory()));
  }

  createEffect(() => {
    readdir();
  });

  return (
    <main>
      <p>{directory()}</p>
      <div style={{ display: 'flex', 'flex-direction': 'column' }}>
        <Show when={directory() !== '/'}>
          <button
            style={{ width: 'min-content' }}
            onClick={() => {
              setDirectory(directory().replace(/\/[^/]+$/, '') || '/');
            }}
          >
            ../
          </button>
        </Show>
        <For each={entries()}>
          {(entry) => (
            <>
              <Show when={entry.is_directory}>
                <button
                  style={{ width: 'min-content' }}
                  onClick={() => {
                    if (!entry.is_directory) {
                      return;
                    }

                    setDirectory(entry.path);
                  }}
                >
                  {entry.path.substring(directory().length)}
                </button>
              </Show>
              <Show when={!entry.is_directory}>
                <p>{entry.path}</p>
              </Show>
            </>
          )}
        </For>
      </div>
    </main>
  );
}

export default App;
