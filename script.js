// Rule-based error database (Approach A)
const rules = [
  {
    language: "javascript",
    keyword: "cannot read properties of undefined",
    what: "JavaScript is trying to access a property or method on a variable that evaluates to undefined.",
    why: "The object variable was never assigned, or asynchronous data (like an API fetch) has not finished loading yet.",
    how: "Add a check to verify the object exists before reading its property, or use optional chaining (?.).",
    code: "// Before:\nconst name = user.profile.name;\n\n// Fix (using optional chaining):\nconst name = user?.profile?.name ?? 'Guest';"
  },
  {
    language: "javascript",
    keyword: "syntaxerror",
    what: "The JavaScript engine encountered syntax that violates language grammar rules.",
    why: "Missing closing brackets, mismatched parentheses, or illegal tokens.",
    how: "Inspect the line number cited in your console to close unclosed strings or brackets.",
    code: "// Fix: Ensure proper syntax and balanced brackets\nconst payload = { success: true };"
  },
  {
    language: "python",
    keyword: "keyerror",
    what: "Python attempted to read a dictionary key that does not exist in the mapping.",
    why: "The key name has a typo, or the server response omitted that specific dictionary field.",
    how: "Use the safe dictionary .get() method instead of bracket notation.",
    code: "# Before:\nval = data['user_id']\n\n# Fix:\nval = data.get('user_id', 'default_value')"
  },
  {
    language: "python",
    keyword: "indexerror",
    what: "An attempt was made to access a sequence item with an index that is out of range.",
    why: "The list is empty or shorter than the index requested.",
    how: "Check the size using len() before accessing items directly.",
    code: "# Fix:\nif len(items) > index:\n    item = items[index]"
  },
  {
    language: "cpp",
    keyword: "segmentation fault",
    what: "The operating system halted the program for trying to access forbidden memory addresses.",
    why: "Dereferencing a null/dangling pointer, stack overflow, or writing outside allocated array boundaries.",
    how: "Initialize pointers to nullptr, check for null before accessing, and enforce strict loop limits.",
    code: "// Fix:\nif (ptr != nullptr) {\n    *ptr = 100;\n}"
  }
];

document.getElementById("fixBtn").addEventListener("click", function () {
  const selectedLang = document.getElementById("languageSelect").value;
  const userError = document.getElementById("errorInput").value.toLowerCase().trim();
  const outputCard = document.getElementById("outputCard");

  if (!userError) {
    alert("Please enter an error message first.");
    return;
  }

  // Find match based on selected language and error keyword
  const match = rules.find(rule => 
    rule.language === selectedLang && userError.includes(rule.keyword)
  );

  outputCard.classList.remove("hidden");

  if (match) {
    document.getElementById("outWhat").textContent = match.what;
    document.getElementById("outWhy").textContent = match.why;
    document.getElementById("outHow").textContent = match.how;
    document.getElementById("outCode").textContent = match.code;
  } else {
    document.getElementById("outWhat").textContent = "Unrecognized error pattern.";
    document.getElementById("outWhy").textContent = "The provided error text does not match predefined rules for " + selectedLang + ".";
    document.getElementById("outHow").textContent = "Check spelling, syntax errors, or verify the terminal line number.";
    document.getElementById("outCode").textContent = "// No predefined code fix available for this exact pattern.";
  }
});
