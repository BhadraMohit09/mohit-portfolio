export type Difficulty = 'Medium' | 'Hard' | 'Impossible';

export interface BugSnippet {
  language: string;
  difficulty: Difficulty;
  code: string;
  bugLine: number;
  explanation: string;
}

export const SNIPPETS: BugSnippet[] = [
  // MEDIUM
  {
    language: "javascript",
    difficulty: "Medium",
    code: `const calculateTotal = (price, tax) => {
  return price - tax; // Calculate total price
};`,
    bugLine: 2,
    explanation: "You should add the tax to the price, not subtract it!",
  },
  {
    language: "react",
    difficulty: "Medium",
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  });
  
  return <div>{count}</div>;
}`,
    bugLine: 8,
    explanation: "Missing dependency array [] in useEffect! This creates an infinite loop of intervals.",
  },
  {
    language: "javascript",
    difficulty: "Medium",
    code: `function checkRole(user) {
  if (user.role = 'admin') {
    return true;
  }
  return false;
}`,
    bugLine: 2,
    explanation: "Assignment '=' used instead of comparison '==='! This always evaluates to true and assigns the role to 'admin'.",
  },
  {
    language: "javascript",
    difficulty: "Medium",
    code: `const users = ['Alice', 'Bob', 'Charlie'];
for (let i = 0; i <= users.length; i++) {
  console.log('User:', users[i].toUpperCase());
}`,
    bugLine: 2,
    explanation: "Off-by-one error: 'i <= users.length' should be '<'. The last iteration tries to access a property of undefined.",
  },
  {
    language: "typescript",
    difficulty: "Medium",
    code: `interface Config {
  retries: number;
}
function setup(cfg?: Config) {
  const maxRetries = cfg.retries || 3;
  return maxRetries;
}`,
    bugLine: 5,
    explanation: "If 'cfg' is undefined, 'cfg.retries' will throw a TypeError. You should use optional chaining: 'cfg?.retries'.",
  },
  {
    language: "python",
    difficulty: "Medium",
    code: `def append_item(item, list=[]):
    list.append(item)
    return list

print(append_item(1))
print(append_item(2))`,
    bugLine: 1,
    explanation: "Mutable default argument 'list=[]' is evaluated only once. Subsequent calls share the same list instance.",
  },
  {
    language: "react",
    difficulty: "Medium",
    code: `const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={Math.random()}>{msg.text}</li>
      ))}
    </ul>
  );
};`,
    bugLine: 5,
    explanation: "Using Math.random() for a React key causes the component to completely unmount and remount on every render, destroying state and performance.",
  },
  
  // HARD
  {
    language: "javascript",
    difficulty: "Hard",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}`,
    bugLine: 1,
    explanation: "Using 'var' instead of 'let' means the loop shares the same 'i' closure. It prints '3' three times instead of 0, 1, 2.",
  },
  {
    language: "javascript",
    difficulty: "Hard",
    code: `const numbers = [10, 5, 20, 1];
numbers.sort();
console.log(numbers); // Expected: [1, 5, 10, 20]`,
    bugLine: 2,
    explanation: "JS sort() converts elements to strings by default! So '10' comes before '2', resulting in [1, 10, 20, 5]. You need a comparator function.",
  },
  {
    language: "javascript",
    difficulty: "Hard",
    code: `function isTwoThirds(value) {
  const threshold = 0.1 + 0.2;
  if (value === threshold) {
    return true;
  }
  return false;
}`,
    bugLine: 2,
    explanation: "Floating point math issue! 0.1 + 0.2 equals 0.30000000000000004 in JavaScript due to IEEE 754 precision.",
  },
  {
    language: "react",
    difficulty: "Hard",
    code: `const Timer = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{time}</div>;
};`,
    bugLine: 4,
    explanation: "Stale closure! 'time' is captured as 0 in the effect, so it will constantly setTime to 0 + 1. Use the functional update: 'setTime(t => t + 1)'.",
  },
  {
    language: "javascript",
    difficulty: "Hard",
    code: `const user = {
  name: 'John',
  greet: function() {
    setTimeout(function() {
      console.log('Hi, ' + this.name);
    }, 100);
  }
};`,
    bugLine: 5,
    explanation: "The inner function inside setTimeout defines its own 'this' context, making 'this.name' undefined. Use an arrow function to lexically bind 'this'.",
  },
  {
    language: "typescript",
    difficulty: "Hard",
    code: `const promises = [
  fetch('/api/users'),
  fetch('/api/posts')
];
const [users, posts] = await promises;
console.log(users.json());`,
    bugLine: 5,
    explanation: "You must use 'await Promise.all(promises)' to resolve an array of promises. Destructuring a raw array of promises yields unfulfilled promise objects.",
  },

  // IMPOSSIBLE
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `const numbers = ["1", "2", "3"];
const parsed = numbers.map(parseInt);
console.log(parsed);`,
    bugLine: 2,
    explanation: "map passes (element, index, array) to the callback. parseInt takes (string, radix). So '2' is parsed with radix 1 (NaN), and '3' with radix 2 (NaN)!",
  },
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `function checkStatus(status) {
  if (status === 'active') {
    return 
      true;
  }
  return false;
}`,
    bugLine: 3,
    explanation: "Automatic Semicolon Insertion (ASI) strikes! JS automatically inserts a ';' after 'return', returning undefined and ignoring 'true'.",
  },
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `let x = 10;
let y = 5;
[x, y] = [y, x];
console.log("Values swapped!");`,
    bugLine: 3,
    explanation: "If there's no semicolon on the previous line (let y = 5), the JS engine tries to parse it as 'let y = 5[x, y] = [y, x]', throwing a TypeError.",
  },
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `const person = { name: "Alice" };
Object.freeze(person);
person.name = "Bob";
if (person.name === "Bob") {
  console.log("Changed!");
}`,
    bugLine: 3,
    explanation: "Object.freeze() silently prevents modification in non-strict mode. 'person.name' remains 'Alice', so it silently fails on line 3.",
  },
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `const id = setTimeout(() => console.log('Done'), 100);
clearTimeout(id);
const newId = setTimeout(() => console.log('New'), 100);
if (id === newId) {
  console.log("IDs matched!");
}`,
    bugLine: 4,
    explanation: "In some JS environments (like browsers), reusing cleared timers can result in the same integer ID being returned, causing unexpected behavior if relying on uniqueness.",
  },
  {
    language: "javascript",
    difficulty: "Impossible",
    code: `const text = "hello";
let isMatch = false;
if (text.match(/hello/g)) {
  isMatch = true;
}
if (/hello/g.test(text)) {
  console.log("Matched twice!");
}`,
    bugLine: 6,
    explanation: "RegExp objects with the 'g' flag maintain state (lastIndex). If the exact same literal isn't re-instantiated, or if reusing a regex, it might fail the second time.",
  }
];
