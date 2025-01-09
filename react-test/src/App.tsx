import logo from "./assets/react.svg";
// import { useState } from "react";
import "./App.css";
import { useState } from "react";

const KanbanCard = ({title, status}: {title: string, status: string}) => (
  <li className="kanban-card">
    <div className="card-title">{title}</div>
    <div className="card-status">{status}</div>
  </li>
);
const KanbanNewCard = ({onSubmit}: {onSubmit: (title: string) => void}) => {
  const [title, setTitle] = useState('');
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
      setTitle('');
    }
  }

  return (
    <li className="kanban-card">
      <h5>添加新卡片</h5>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  );
};
function App() {
  const [showAddCard, setShowAddCard] = useState(false);
  const handleAddCard = () => {
    setShowAddCard(true);
  }
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "2025/1/8 11:46:11" },
    { title: "开发任务-3", status: "2025/1/3 11:46:11" },
    { title: "开发任务-5", status: "2025/1/1 15:26:14" },
    { title: "测试任务-3", status: "2025/1/1 14:46:12" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "开发任务-4", status: "22-05-22 18:15" },
    { title: "开发任务-6", status: "22-05-22 18:15" },
    { title: "测试任务-2", status: "22-05-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState([
    { title: "开发任务-2", status: "22-05-22 18:15" },
    { title: "测试任务-1", status: "22-05-22 18:15" },
  ]);
  const handleSubmit = (title: string) => {
    setTodoList([{title, status: new Date().toLocaleString()} ,...todoList]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>自动更新</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>
            待处理
            <button onClick={handleAddCard} disabled={showAddCard}>
              ⊕添加新卡片
            </button>
          </h2>
          <ul>
            {showAddCard && <KanbanNewCard onSubmit={handleSubmit}/>}
            {todoList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            {ongoingList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            {doneList.map((props) => (
              <KanbanCard {...props} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
