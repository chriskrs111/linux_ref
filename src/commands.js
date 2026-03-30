export const commands = [
  { cmd: "ls", desc: "List directory contents", usage: "ls [options] [path]", ex: "ls -la /home", cat: "File & Directory",
    purpose: "Displays files and directories within a given path. Without arguments, lists contents of the current working directory. Essential for navigating and inspecting the filesystem.",
    params: [{ name: "path", desc: "Directory or file path to list (defaults to current directory)" }],
    options: [{ flag: "-l", desc: "Long format with permissions, owner, size, date" }, { flag: "-a", desc: "Include hidden files (starting with .)" }, { flag: "-h", desc: "Human-readable file sizes (KB, MB)" }, { flag: "-R", desc: "Recursively list subdirectories" }, { flag: "-t", desc: "Sort by modification time, newest first" }, { flag: "-S", desc: "Sort by file size, largest first" }, { flag: "-r", desc: "Reverse sort order" }] },

  { cmd: "cd", desc: "Change directory", usage: "cd [directory]", ex: "cd /var/log", cat: "File & Directory",
    purpose: "Changes the shell's current working directory. Navigation shortcut: 'cd ~' goes home, 'cd -' returns to the previous directory, 'cd ..' moves up one level.",
    params: [{ name: "directory", desc: "Target directory path (absolute or relative). Omit to go to home directory" }],
    options: [{ flag: "-", desc: "Switch to previous directory ($OLDPWD)" }, { flag: "~", desc: "Shorthand for home directory" }, { flag: "..", desc: "Move up one level in the directory tree" }] },

  { cmd: "pwd", desc: "Print working directory", usage: "pwd", ex: "pwd", cat: "File & Directory",
    purpose: "Prints the absolute path of the current working directory. Useful in scripts and when navigating complex directory structures.",
    params: [],
    options: [{ flag: "-L", desc: "Print logical path (follow symlinks, default)" }, { flag: "-P", desc: "Print physical path (resolve symlinks)" }] },

  { cmd: "mkdir", desc: "Make directories", usage: "mkdir [options] dir", ex: "mkdir -p /tmp/a/b", cat: "File & Directory",
    purpose: "Creates one or more new directories. With -p, creates all intermediate parent directories as needed without errors if they already exist.",
    params: [{ name: "dir", desc: "Name or path of the directory/directories to create" }],
    options: [{ flag: "-p", desc: "Create parent directories as needed; no error if existing" }, { flag: "-m", desc: "Set permissions (e.g. -m 755)" }, { flag: "-v", desc: "Print a message for each created directory" }] },

  { cmd: "rmdir", desc: "Remove empty directories", usage: "rmdir dir", ex: "rmdir /tmp/empty", cat: "File & Directory",
    purpose: "Removes empty directories. Fails if the directory contains any files or subdirectories. Use 'rm -rf' to remove non-empty directories.",
    params: [{ name: "dir", desc: "Path to the empty directory to remove" }],
    options: [{ flag: "-p", desc: "Remove directory and empty ancestors" }, { flag: "-v", desc: "Print each directory as it is removed" }] },

  { cmd: "rm", desc: "Remove files or directories", usage: "rm [options] file", ex: "rm -rf /tmp/old", cat: "File & Directory",
    purpose: "Deletes files or directories permanently. Unlike GUI deletion, there is no trash/recycle bin — removed files are not easily recoverable. Use with caution, especially with -rf.",
    params: [{ name: "file", desc: "File(s) or directory path(s) to remove. Accepts wildcards." }],
    options: [{ flag: "-r", desc: "Recursively remove directories and their contents" }, { flag: "-f", desc: "Force removal, ignore nonexistent files, no prompts" }, { flag: "-i", desc: "Prompt before each removal" }, { flag: "-v", desc: "Verbose; show each file as it is removed" }] },

  { cmd: "cp", desc: "Copy files and directories", usage: "cp [options] src dest", ex: "cp -r /src /dest", cat: "File & Directory",
    purpose: "Copies files or directories from source to destination. If the destination is a directory, the source is copied inside it. Use -r for copying entire directory trees.",
    params: [{ name: "src", desc: "Source file or directory to copy" }, { name: "dest", desc: "Destination path or directory" }],
    options: [{ flag: "-r", desc: "Recursively copy directories" }, { flag: "-p", desc: "Preserve timestamps, ownership, and permissions" }, { flag: "-i", desc: "Prompt before overwriting" }, { flag: "-v", desc: "Verbose output" }, { flag: "-u", desc: "Copy only when source is newer than destination" }] },

  { cmd: "mv", desc: "Move or rename files", usage: "mv src dest", ex: "mv old.txt new.txt", cat: "File & Directory",
    purpose: "Moves files or directories to a new location, or renames them. Within the same filesystem, no data is copied — only the directory entry is updated, making it very fast.",
    params: [{ name: "src", desc: "Source file or directory" }, { name: "dest", desc: "Destination path or new name" }],
    options: [{ flag: "-i", desc: "Prompt before overwriting existing files" }, { flag: "-f", desc: "Force move, overwrite without prompting" }, { flag: "-v", desc: "Verbose; print files as they are moved" }, { flag: "-u", desc: "Move only when src is newer than dest" }] },

  { cmd: "touch", desc: "Create empty file or update timestamp", usage: "touch file", ex: "touch newfile.txt", cat: "File & Directory",
    purpose: "Creates an empty file if it doesn't exist, or updates the access/modification timestamps of an existing file. Commonly used in scripts to ensure a file exists.",
    params: [{ name: "file", desc: "File(s) to create or update timestamps on" }],
    options: [{ flag: "-a", desc: "Change only the access time" }, { flag: "-m", desc: "Change only the modification time" }, { flag: "-t", desc: "Set a specific timestamp (YYYYMMDDhhmm)" }, { flag: "-c", desc: "Do not create file if it doesn't exist" }] },

  { cmd: "find", desc: "Search for files in directory tree", usage: "find path [options]", ex: "find / -name '*.log'", cat: "File & Directory",
    purpose: "Recursively searches directory trees for files matching given criteria such as name, size, type, permissions, or modification time. Can also execute actions on results.",
    params: [{ name: "path", desc: "Starting directory for the search (e.g. / or .)" }],
    options: [{ flag: "-name", desc: "Match by filename pattern (case-sensitive)" }, { flag: "-iname", desc: "Match by filename (case-insensitive)" }, { flag: "-type", desc: "Match by type: f=file, d=dir, l=symlink" }, { flag: "-size", desc: "Match by size (e.g. +10M, -1k)" }, { flag: "-mtime", desc: "Match by modification time in days" }, { flag: "-exec", desc: "Execute command on each result" }, { flag: "-user", desc: "Match files owned by a user" }] },

  { cmd: "ln", desc: "Create hard/soft links", usage: "ln [-s] target link", ex: "ln -s /etc/hosts hosts", cat: "File & Directory",
    purpose: "Creates hard links (same inode, same filesystem) or symbolic links (pointer to a path, can span filesystems). Symlinks are most commonly used for aliases and flexible path management.",
    params: [{ name: "target", desc: "Existing file or directory to link to" }, { name: "link", desc: "Name of the new link to create" }],
    options: [{ flag: "-s", desc: "Create a symbolic (soft) link" }, { flag: "-f", desc: "Remove existing destination file" }, { flag: "-v", desc: "Verbose output" }, { flag: "-r", desc: "Create symlinks relative to the link location" }] },

  { cmd: "du", desc: "Disk usage of files/dirs", usage: "du [options] path", ex: "du -sh /var/*", cat: "File & Directory",
    purpose: "Estimates disk space used by files and directories. Useful for finding what's consuming disk space. By default, reports sizes in 512-byte blocks.",
    params: [{ name: "path", desc: "File or directory to measure (defaults to current directory)" }],
    options: [{ flag: "-h", desc: "Human-readable sizes (KB, MB, GB)" }, { flag: "-s", desc: "Summary — display only total for each argument" }, { flag: "-a", desc: "Show disk usage for all files, not just directories" }, { flag: "--max-depth", desc: "Limit directory depth reported" }, { flag: "-c", desc: "Produce a grand total at the end" }] },

  { cmd: "stat", desc: "File/filesystem status", usage: "stat file", ex: "stat /etc/hosts", cat: "File & Directory",
    purpose: "Displays detailed metadata about a file or filesystem including inode number, permissions, owner, size, and timestamps (access, modify, change).",
    params: [{ name: "file", desc: "File or directory to inspect" }],
    options: [{ flag: "-f", desc: "Display filesystem status instead of file status" }, { flag: "-c", desc: "Use a custom format string for output" }, { flag: "-t", desc: "Terse output (single line)" }] },

  { cmd: "cat", desc: "Concatenate and display files", usage: "cat [options] file", ex: "cat /etc/hosts", cat: "File Viewing",
    purpose: "Reads files sequentially and writes their content to standard output. Used to display file content, concatenate multiple files, or pipe content to other commands.",
    params: [{ name: "file", desc: "One or more files to read and display" }],
    options: [{ flag: "-n", desc: "Number all output lines" }, { flag: "-b", desc: "Number non-empty output lines only" }, { flag: "-s", desc: "Suppress repeated empty lines" }, { flag: "-A", desc: "Show all special characters (tabs, EOL)" }, { flag: "-v", desc: "Show non-printing characters" }] },

  { cmd: "less", desc: "View file with pagination", usage: "less file", ex: "less /var/log/syslog", cat: "File Viewing",
    purpose: "An interactive pager for reading large files. Unlike 'more', allows backward navigation. Supports searching with / and ?, jumping to lines, and doesn't load the whole file into memory.",
    params: [{ name: "file", desc: "File to view. Can also receive piped input." }],
    options: [{ flag: "-N", desc: "Show line numbers" }, { flag: "-S", desc: "Chop long lines (no wrapping)" }, { flag: "-i", desc: "Case-insensitive search" }, { flag: "-F", desc: "Quit if content fits on one screen" }, { flag: "+G", desc: "Start at end of file" }] },

  { cmd: "more", desc: "View file page by page", usage: "more file", ex: "more /etc/passwd", cat: "File Viewing",
    purpose: "A basic pager for viewing file content one screen at a time. Forward-only navigation. Press Space to advance, q to quit. Largely superseded by 'less'.",
    params: [{ name: "file", desc: "File to display page by page" }],
    options: [{ flag: "-d", desc: "Show navigation help prompt" }, { flag: "-f", desc: "Count logical rather than screen lines" }, { flag: "-p", desc: "Clear screen before displaying each page" }, { flag: "+N", desc: "Start at line N" }] },

  { cmd: "head", desc: "Show first N lines of file", usage: "head [-n N] file", ex: "head -20 access.log", cat: "File Viewing",
    purpose: "Outputs the first part of files. By default prints the first 10 lines. Useful for previewing large files or checking log/config file headers quickly.",
    params: [{ name: "file", desc: "File(s) to read the beginning of" }],
    options: [{ flag: "-n N", desc: "Print the first N lines (default: 10)" }, { flag: "-c N", desc: "Print the first N bytes" }, { flag: "-q", desc: "Never print filename headers" }, { flag: "-v", desc: "Always print filename headers" }] },

  { cmd: "tail", desc: "Show last N lines of file", usage: "tail [-n N] [-f] file", ex: "tail -f /var/log/syslog", cat: "File Viewing",
    purpose: "Outputs the last part of files. The -f flag (follow) makes it continuously read new lines as they are appended — the primary tool for real-time log monitoring.",
    params: [{ name: "file", desc: "File to read the end of" }],
    options: [{ flag: "-n N", desc: "Print the last N lines (default: 10)" }, { flag: "-f", desc: "Follow: output appended data as file grows" }, { flag: "-F", desc: "Follow by filename, retry if file disappears" }, { flag: "-c N", desc: "Print the last N bytes" }] },

  { cmd: "tac", desc: "Display file in reverse", usage: "tac file", ex: "tac file.txt", cat: "File Viewing",
    purpose: "Concatenates and displays files in reverse line order (last line first). The reverse of cat. Useful for reading logs chronologically when newest entries are at the bottom.",
    params: [{ name: "file", desc: "File(s) to display in reverse" }],
    options: [{ flag: "-s", desc: "Use a custom separator instead of newline" }, { flag: "-r", desc: "Treat separator as a regex" }] },

  { cmd: "xxd", desc: "Hex dump of file", usage: "xxd file", ex: "xxd binary.bin", cat: "File Viewing",
    purpose: "Creates a hex dump of a file or stdin, showing bytes in hexadecimal alongside their ASCII representation. Also supports converting hex back to binary.",
    params: [{ name: "file", desc: "File to hex dump (or piped input)" }],
    options: [{ flag: "-l N", desc: "Stop after N bytes" }, { flag: "-c N", desc: "N bytes per row (default 16)" }, { flag: "-r", desc: "Reverse: convert hex dump back to binary" }, { flag: "-b", desc: "Binary digit dump instead of hex" }] },

  { cmd: "grep", desc: "Search text with patterns", usage: "grep [options] pattern file", ex: "grep -r 'error' /var/log", cat: "Text Processing",
    purpose: "Searches input for lines matching a regular expression pattern and prints matching lines. One of the most powerful and frequently used text processing tools in Linux.",
    params: [{ name: "pattern", desc: "Regular expression or string to search for" }, { name: "file", desc: "File(s) to search (or use with pipe)" }],
    options: [{ flag: "-r", desc: "Recursively search directories" }, { flag: "-i", desc: "Case-insensitive matching" }, { flag: "-v", desc: "Invert match — show non-matching lines" }, { flag: "-n", desc: "Print line numbers" }, { flag: "-l", desc: "Print only filenames with matches" }, { flag: "-c", desc: "Print count of matching lines" }, { flag: "-E", desc: "Extended regex (same as egrep)" }, { flag: "-A N", desc: "Print N lines after each match" }, { flag: "-B N", desc: "Print N lines before each match" }] },

  { cmd: "sed", desc: "Stream editor for text", usage: "sed 's/old/new/g' file", ex: "sed -i 's/foo/bar/g' f.txt", cat: "Text Processing",
    purpose: "Non-interactive stream editor that reads input line by line and applies editing commands. Most commonly used for find-and-replace, deletion, and text transformation in scripts.",
    params: [{ name: "script", desc: "Editing command(s) to apply (e.g. 's/old/new/g')" }, { name: "file", desc: "Input file(s) or piped stdin" }],
    options: [{ flag: "-i", desc: "Edit files in-place (modifies original)" }, { flag: "-n", desc: "Suppress automatic printing of lines" }, { flag: "-e", desc: "Add multiple script expressions" }, { flag: "-r", desc: "Use extended regular expressions" }, { flag: "-f", desc: "Read commands from a script file" }] },

  { cmd: "awk", desc: "Pattern scanning and processing", usage: "awk 'program' file", ex: "awk '{print $1}' log", cat: "Text Processing",
    purpose: "A powerful programming language for pattern matching and text processing. Processes input line by line, splitting into fields. Ideal for structured data like CSVs, logs, and columnar output.",
    params: [{ name: "program", desc: "AWK program in single quotes (e.g. '{print $2}')" }, { name: "file", desc: "Input file or piped stdin" }],
    options: [{ flag: "-F", desc: "Set field separator (e.g. -F: for colon)" }, { flag: "-v", desc: "Assign variable (e.g. -v OFS=,)" }, { flag: "-f", desc: "Read program from a file" }, { flag: "NR", desc: "Built-in: current record (line) number" }, { flag: "NF", desc: "Built-in: number of fields in current record" }] },

  { cmd: "sort", desc: "Sort lines of text", usage: "sort [options] file", ex: "sort -n numbers.txt", cat: "Text Processing",
    purpose: "Sorts lines of text files or standard input. Supports numeric, alphabetic, reverse, and field-based sorting. Often combined with uniq for frequency analysis.",
    params: [{ name: "file", desc: "File(s) to sort (or piped input)" }],
    options: [{ flag: "-n", desc: "Numeric sort (not lexicographic)" }, { flag: "-r", desc: "Reverse the sort order" }, { flag: "-k", desc: "Sort by a specific field (e.g. -k2)" }, { flag: "-t", desc: "Field delimiter (e.g. -t:)" }, { flag: "-u", desc: "Remove duplicate lines" }, { flag: "-h", desc: "Human-readable numbers (e.g. 1K, 2M)" }] },

  { cmd: "uniq", desc: "Filter duplicate lines", usage: "uniq [options] file", ex: "sort f.txt | uniq -c", cat: "Text Processing",
    purpose: "Filters adjacent duplicate lines from sorted input. Must be combined with sort to remove all duplicates. With -c, prefixes each line with the count of occurrences.",
    params: [{ name: "file", desc: "Input file (or piped from sort)" }],
    options: [{ flag: "-c", desc: "Prefix lines with count of occurrences" }, { flag: "-d", desc: "Print only duplicate lines" }, { flag: "-u", desc: "Print only unique lines" }, { flag: "-i", desc: "Case-insensitive comparison" }] },

  { cmd: "wc", desc: "Count words/lines/chars", usage: "wc [options] file", ex: "wc -l /etc/passwd", cat: "Text Processing",
    purpose: "Prints newline, word, and byte counts for files. Frequently used to count lines in log files or output from pipelines.",
    params: [{ name: "file", desc: "File(s) to count (or piped input)" }],
    options: [{ flag: "-l", desc: "Print newline (line) count only" }, { flag: "-w", desc: "Print word count only" }, { flag: "-c", desc: "Print byte count only" }, { flag: "-m", desc: "Print character count only" }] },

  { cmd: "cut", desc: "Remove sections from lines", usage: "cut -d: -f1 file", ex: "cut -d: -f1 /etc/passwd", cat: "Text Processing",
    purpose: "Extracts specific columns or byte ranges from each line of a file. Commonly used to parse delimited files like /etc/passwd or CSV data.",
    params: [{ name: "file", desc: "File to cut columns from (or piped input)" }],
    options: [{ flag: "-d", desc: "Delimiter character (e.g. -d:)" }, { flag: "-f", desc: "Field number(s) to extract (e.g. -f1,3)" }, { flag: "-c", desc: "Extract specific character positions" }, { flag: "-b", desc: "Extract specific byte positions" }] },

  { cmd: "tr", desc: "Translate or delete chars", usage: "tr set1 set2", ex: "echo 'hi' | tr a-z A-Z", cat: "Text Processing",
    purpose: "Translates, squeezes, or deletes characters from standard input. Reads from stdin only (no file argument). Commonly used for case conversion and character substitution.",
    params: [{ name: "set1", desc: "Characters to replace or delete" }, { name: "set2", desc: "Replacement characters (not used with -d)" }],
    options: [{ flag: "-d", desc: "Delete characters in set1" }, { flag: "-s", desc: "Squeeze repeated characters to one" }, { flag: "-c", desc: "Complement (invert) the set" }] },

  { cmd: "diff", desc: "Compare files line by line", usage: "diff file1 file2", ex: "diff old.conf new.conf", cat: "Text Processing",
    purpose: "Compares two files line by line and outputs the differences. Used for reviewing configuration changes, code reviews, and generating patches.",
    params: [{ name: "file1", desc: "First file to compare" }, { name: "file2", desc: "Second file to compare" }],
    options: [{ flag: "-u", desc: "Unified format (most readable, used in patches)" }, { flag: "-r", desc: "Recursively compare directories" }, { flag: "-i", desc: "Ignore case differences" }, { flag: "-w", desc: "Ignore whitespace" }, { flag: "-q", desc: "Report only whether files differ" }] },

  { cmd: "xargs", desc: "Build and run commands from stdin", usage: "cmd | xargs cmd2", ex: "find . -name '*.tmp' | xargs rm", cat: "Text Processing",
    purpose: "Reads items from stdin and executes a command with those items as arguments. Bridges the gap between commands that produce output and commands that accept file arguments.",
    params: [],
    options: [{ flag: "-I {}", desc: "Replace {} with each input item" }, { flag: "-n N", desc: "Use at most N arguments per command" }, { flag: "-P N", desc: "Run N processes in parallel" }, { flag: "-0", desc: "Input separated by null (use with find -print0)" }, { flag: "-t", desc: "Print command before executing" }] },

  { cmd: "tee", desc: "Read stdin, write stdout and files", usage: "cmd | tee file", ex: "ls | tee output.txt", cat: "Text Processing",
    purpose: "Reads standard input and writes it to both standard output and one or more files simultaneously. Useful for logging pipeline output while still seeing it on screen.",
    params: [{ name: "file", desc: "File(s) to write output to" }],
    options: [{ flag: "-a", desc: "Append to files rather than overwrite" }, { flag: "-i", desc: "Ignore interrupt signals" }] },

  { cmd: "chmod", desc: "Change file permissions", usage: "chmod [mode] file", ex: "chmod 755 script.sh", cat: "Permissions",
    purpose: "Changes the read, write, and execute permissions of files and directories for owner, group, and others. Accepts numeric (octal) or symbolic (u+x) notation.",
    params: [{ name: "mode", desc: "Octal (755) or symbolic (u+x, g-w, o=r) permission string" }, { name: "file", desc: "File or directory to modify" }],
    options: [{ flag: "-R", desc: "Recursively change permissions in directory tree" }, { flag: "-v", desc: "Verbose; show files as they are changed" }, { flag: "-c", desc: "Report only when a change is made" }, { flag: "u/g/o/a", desc: "User / Group / Other / All (symbolic mode)" }] },

  { cmd: "chown", desc: "Change file owner/group", usage: "chown user:group file", ex: "chown www:www /var/www", cat: "Permissions",
    purpose: "Changes the ownership of files or directories. Can set user, group, or both simultaneously. Requires root privileges to change ownership to another user.",
    params: [{ name: "user:group", desc: "New owner and optional group (e.g. www-data:www-data)" }, { name: "file", desc: "File or directory to change ownership of" }],
    options: [{ flag: "-R", desc: "Recursively change ownership" }, { flag: "-v", desc: "Verbose output" }, { flag: "--reference", desc: "Use ownership from a reference file" }] },

  { cmd: "chgrp", desc: "Change group ownership", usage: "chgrp group file", ex: "chgrp staff doc.txt", cat: "Permissions",
    purpose: "Changes the group ownership of files or directories. Similar to chown but only for groups. Useful when users need shared access to files via group membership.",
    params: [{ name: "group", desc: "New group name or GID" }, { name: "file", desc: "File or directory to change group on" }],
    options: [{ flag: "-R", desc: "Recursively change group" }, { flag: "-v", desc: "Verbose output" }] },

  { cmd: "umask", desc: "Set default permission mask", usage: "umask [mask]", ex: "umask 022", cat: "Permissions",
    purpose: "Sets the file creation mask that determines default permissions for newly created files and directories. A umask of 022 results in files with 644 and dirs with 755.",
    params: [{ name: "mask", desc: "Octal mask value (e.g. 022, 027). Omit to display current mask." }],
    options: [{ flag: "-S", desc: "Display mask in symbolic notation (u=rwx,g=rx,o=rx)" }] },

  { cmd: "ps", desc: "Report process status", usage: "ps [options]", ex: "ps aux | grep nginx", cat: "Process Management",
    purpose: "Displays a snapshot of currently running processes. The most common invocation is 'ps aux' which shows all processes for all users with detailed CPU and memory stats.",
    params: [],
    options: [{ flag: "a", desc: "Show processes for all users" }, { flag: "u", desc: "Display user-oriented format (CPU, MEM)" }, { flag: "x", desc: "Include processes without a TTY" }, { flag: "-e", desc: "Show all processes" }, { flag: "-f", desc: "Full-format listing with PPID, CMD" }, { flag: "--sort", desc: "Sort by field (e.g. --sort=-%cpu)" }] },

  { cmd: "top", desc: "Dynamic real-time process viewer", usage: "top", ex: "top", cat: "Process Management",
    purpose: "Provides a real-time dynamic view of running processes, CPU usage, memory usage, and system load. Processes are sorted by CPU usage by default. Press 'q' to quit.",
    params: [],
    options: [{ flag: "-d N", desc: "Set refresh interval to N seconds" }, { flag: "-p PID", desc: "Monitor specific process by PID" }, { flag: "-u user", desc: "Show only processes for a user" }, { flag: "-n N", desc: "Exit after N iterations" }, { flag: "-b", desc: "Batch mode (non-interactive, for scripts)" }] },

  { cmd: "htop", desc: "Interactive process viewer", usage: "htop", ex: "htop", cat: "Process Management",
    purpose: "An enhanced version of top with a color UI, mouse support, and easier process management. Allows sorting, filtering, and killing processes interactively.",
    params: [],
    options: [{ flag: "-d N", desc: "Refresh delay in tenths of a second" }, { flag: "-u user", desc: "Show only processes for a specific user" }, { flag: "-p PID", desc: "Show only specified PIDs" }, { flag: "-s col", desc: "Sort by a specific column at startup" }] },

  { cmd: "kill", desc: "Send signal to process", usage: "kill [-signal] PID", ex: "kill -9 1234", cat: "Process Management",
    purpose: "Sends a signal to a process by PID. Default signal is SIGTERM (15) which requests graceful shutdown. SIGKILL (9) forcefully terminates a process with no cleanup.",
    params: [{ name: "PID", desc: "Process ID to send the signal to" }],
    options: [{ flag: "-9", desc: "SIGKILL — force kill immediately (no cleanup)" }, { flag: "-15", desc: "SIGTERM — graceful termination request (default)" }, { flag: "-1", desc: "SIGHUP — reload config / restart" }, { flag: "-l", desc: "List all available signal names" }, { flag: "-s", desc: "Specify signal by name (e.g. -s SIGTERM)" }] },

  { cmd: "killall", desc: "Kill processes by name", usage: "killall name", ex: "killall nginx", cat: "Process Management",
    purpose: "Sends a signal to all processes matching a given name. More convenient than kill when you don't know the PID. Can kill multiple instances at once.",
    params: [{ name: "name", desc: "Process name to kill" }],
    options: [{ flag: "-9", desc: "Force kill (SIGKILL)" }, { flag: "-i", desc: "Prompt before killing each process" }, { flag: "-v", desc: "Verbose output" }, { flag: "-w", desc: "Wait for all processes to die" }] },

  { cmd: "jobs", desc: "List active jobs", usage: "jobs", ex: "jobs -l", cat: "Process Management",
    purpose: "Lists currently active jobs (background/suspended processes) in the current shell session. Works with bg and fg to manage job control.",
    params: [],
    options: [{ flag: "-l", desc: "Show PID in addition to job info" }, { flag: "-p", desc: "Show only PIDs" }, { flag: "-r", desc: "Show only running jobs" }, { flag: "-s", desc: "Show only stopped jobs" }] },

  { cmd: "nohup", desc: "Run command immune to hangups", usage: "nohup cmd &", ex: "nohup ./server.sh &", cat: "Process Management",
    purpose: "Runs a command that will continue running after you log out by ignoring the SIGHUP signal. Output is redirected to nohup.out by default.",
    params: [{ name: "cmd", desc: "Command to run persistently in background" }],
    options: [{ flag: "&", desc: "Append to run in background (recommended with nohup)" }] },

  { cmd: "lsof", desc: "List open files", usage: "lsof [options]", ex: "lsof -i :80", cat: "Process Management",
    purpose: "Lists all open files and the processes that opened them. Since everything in Linux is a file, this includes network sockets, devices, and pipes. Essential for port and resource debugging.",
    params: [],
    options: [{ flag: "-i :PORT", desc: "Show processes using a specific port" }, { flag: "-u user", desc: "Show files opened by a user" }, { flag: "-p PID", desc: "Show files opened by a process" }, { flag: "-t", desc: "Output PIDs only (for scripting)" }, { flag: "+D dir", desc: "Show all files open under a directory" }] },

  { cmd: "ip", desc: "Show/manipulate routing/interfaces", usage: "ip [options] object cmd", ex: "ip addr show", cat: "Networking",
    purpose: "The modern replacement for ifconfig and route. Manages network interfaces, IP addresses, routing tables, and tunnels. Part of the iproute2 package.",
    params: [{ name: "object", desc: "Network object: addr, link, route, neigh, rule" }, { name: "cmd", desc: "Action: show, add, del, set, flush" }],
    options: [{ flag: "addr show", desc: "Show all IP addresses on interfaces" }, { flag: "link set", desc: "Bring interface up/down (e.g. ip link set eth0 up)" }, { flag: "route show", desc: "Display the routing table" }, { flag: "-4", desc: "Show IPv4 only" }, { flag: "-6", desc: "Show IPv6 only" }, { flag: "-s", desc: "Show statistics" }] },

  { cmd: "ping", desc: "Test network connectivity", usage: "ping [-c N] host", ex: "ping -c 4 8.8.8.8", cat: "Networking",
    purpose: "Sends ICMP ECHO_REQUEST packets to a host to test reachability and measure round-trip time. Essential for basic network troubleshooting.",
    params: [{ name: "host", desc: "Hostname or IP address to ping" }],
    options: [{ flag: "-c N", desc: "Stop after sending N packets" }, { flag: "-i N", desc: "Interval N seconds between packets" }, { flag: "-t N", desc: "Set TTL value" }, { flag: "-s N", desc: "Set packet size in bytes" }, { flag: "-q", desc: "Quiet — show only summary" }, { flag: "-W N", desc: "Wait N seconds for a reply" }] },

  { cmd: "ssh", desc: "Secure shell remote login", usage: "ssh user@host", ex: "ssh admin@192.168.1.1", cat: "Networking",
    purpose: "Opens an encrypted remote shell session to another host. Supports password or public-key authentication. Also used for port forwarding and tunneling.",
    params: [{ name: "user@host", desc: "Remote username and hostname or IP address" }],
    options: [{ flag: "-p", desc: "Connect on non-default port (default: 22)" }, { flag: "-i", desc: "Specify private key file" }, { flag: "-L", desc: "Local port forwarding" }, { flag: "-R", desc: "Remote port forwarding" }, { flag: "-N", desc: "No remote command; tunnel only" }, { flag: "-v", desc: "Verbose mode for debugging" }, { flag: "-X", desc: "Enable X11 forwarding" }] },

  { cmd: "scp", desc: "Secure copy over SSH", usage: "scp src user@host:dest", ex: "scp file.txt user@srv:/tmp", cat: "Networking",
    purpose: "Copies files between hosts over an SSH-encrypted connection. Syntax is similar to cp. Being replaced by sftp/rsync but still widely used for quick one-off transfers.",
    params: [{ name: "src", desc: "Source file (local path or user@host:path)" }, { name: "dest", desc: "Destination (local path or user@host:path)" }],
    options: [{ flag: "-r", desc: "Recursively copy directories" }, { flag: "-P", desc: "Port number (uppercase P, unlike ssh)" }, { flag: "-i", desc: "Identity/private key file" }, { flag: "-p", desc: "Preserve file timestamps and permissions" }] },

  { cmd: "curl", desc: "Transfer data with URLs", usage: "curl [options] URL", ex: "curl -I https://example.com", cat: "Networking",
    purpose: "Transfers data to/from servers using URLs. Supports HTTP, HTTPS, FTP, SCP, and more. Widely used for API testing, file downloads, and debugging web services.",
    params: [{ name: "URL", desc: "Target URL to connect to" }],
    options: [{ flag: "-I", desc: "Fetch headers only (HEAD request)" }, { flag: "-X", desc: "Specify HTTP method (GET, POST, PUT, DELETE)" }, { flag: "-d", desc: "Send data in POST request body" }, { flag: "-H", desc: "Add custom request header" }, { flag: "-o", desc: "Write output to a file" }, { flag: "-u", desc: "Username:password for authentication" }, { flag: "-k", desc: "Allow insecure SSL connections" }, { flag: "-L", desc: "Follow redirects" }] },

  { cmd: "wget", desc: "Download files from web", usage: "wget [options] URL", ex: "wget https://example.com/f.tgz", cat: "Networking",
    purpose: "Non-interactive downloader supporting HTTP, HTTPS, and FTP. Can resume downloads, mirror sites, and download in the background. Preferred over curl for file downloads.",
    params: [{ name: "URL", desc: "URL of the file or page to download" }],
    options: [{ flag: "-O", desc: "Save to a specific filename" }, { flag: "-c", desc: "Continue/resume an interrupted download" }, { flag: "-r", desc: "Recursively download" }, { flag: "-q", desc: "Quiet mode (no output)" }, { flag: "-b", desc: "Download in background" }, { flag: "--limit-rate", desc: "Limit download speed (e.g. --limit-rate=1m)" }] },

  { cmd: "rsync", desc: "Remote file sync", usage: "rsync [opts] src dest", ex: "rsync -avz /src user@host:/dest", cat: "Networking",
    purpose: "Efficiently synchronizes files and directories locally or over SSH. Only transfers changed parts of files (delta transfer). The preferred tool for backups and deployments.",
    params: [{ name: "src", desc: "Source path (local or user@host:path)" }, { name: "dest", desc: "Destination path (local or user@host:path)" }],
    options: [{ flag: "-a", desc: "Archive mode (recursive, preserves perms/timestamps)" }, { flag: "-v", desc: "Verbose output" }, { flag: "-z", desc: "Compress data during transfer" }, { flag: "-n", desc: "Dry run — show what would be transferred" }, { flag: "--delete", desc: "Delete files at dest not present at src" }, { flag: "--exclude", desc: "Exclude files matching a pattern" }, { flag: "-P", desc: "Show progress and keep partial files" }] },

  { cmd: "dig", desc: "DNS lookup utility", usage: "dig [options] host", ex: "dig google.com A", cat: "Networking",
    purpose: "Queries DNS servers for information about hostnames, IP addresses, mail servers, and other DNS records. More powerful and flexible than nslookup.",
    params: [{ name: "host", desc: "Hostname or domain to query" }],
    options: [{ flag: "A", desc: "Query A (IPv4 address) records" }, { flag: "MX", desc: "Query mail exchange records" }, { flag: "NS", desc: "Query name server records" }, { flag: "+short", desc: "Brief output — just the answer" }, { flag: "@server", desc: "Query a specific DNS server" }, { flag: "-x", desc: "Reverse DNS lookup (IP to hostname)" }] },

  { cmd: "netstat", desc: "Network connections/stats", usage: "netstat [options]", ex: "netstat -tulnp", cat: "Networking",
    purpose: "Displays network connections, routing tables, interface statistics, and listening ports. Being superseded by 'ss' but still widely available and used.",
    params: [],
    options: [{ flag: "-t", desc: "Show TCP connections" }, { flag: "-u", desc: "Show UDP connections" }, { flag: "-l", desc: "Show only listening sockets" }, { flag: "-n", desc: "Show numeric addresses (no DNS)" }, { flag: "-p", desc: "Show PID and program name" }, { flag: "-r", desc: "Show routing table" }] },

  { cmd: "ss", desc: "Socket statistics (modern netstat)", usage: "ss [options]", ex: "ss -tulnp", cat: "Networking",
    purpose: "Modern replacement for netstat. Faster and provides more detailed information about sockets. Preferred on modern Linux systems for checking open ports and connections.",
    params: [],
    options: [{ flag: "-t", desc: "Show TCP sockets" }, { flag: "-u", desc: "Show UDP sockets" }, { flag: "-l", desc: "Show listening sockets only" }, { flag: "-n", desc: "Numeric output (no name resolution)" }, { flag: "-p", desc: "Show process using socket" }, { flag: "-s", desc: "Print summary statistics" }] },

  { cmd: "iptables", desc: "Firewall/packet filter rules", usage: "iptables [options]", ex: "iptables -L -n -v", cat: "Networking",
    purpose: "Configures the Linux kernel firewall (netfilter). Controls incoming, outgoing, and forwarded network traffic using chains (INPUT, OUTPUT, FORWARD) and rules.",
    params: [],
    options: [{ flag: "-L", desc: "List all rules in a chain" }, { flag: "-A", desc: "Append a rule to a chain" }, { flag: "-I", desc: "Insert a rule at a position" }, { flag: "-D", desc: "Delete a matching rule" }, { flag: "-F", desc: "Flush (delete) all rules in a chain" }, { flag: "-n", desc: "Show numeric IPs/ports (no DNS lookup)" }, { flag: "-v", desc: "Verbose output with packet/byte counts" }, { flag: "-p", desc: "Match protocol (tcp, udp, icmp)" }] },

  { cmd: "nc", desc: "Netcat – TCP/UDP swiss army knife", usage: "nc [opts] host port", ex: "nc -zv host 80", cat: "Networking",
    purpose: "Reads and writes data across network connections using TCP or UDP. Used for port scanning, banner grabbing, file transfer, and creating simple network servers/clients.",
    params: [{ name: "host", desc: "Target hostname or IP address" }, { name: "port", desc: "Port number to connect to or listen on" }],
    options: [{ flag: "-l", desc: "Listen mode (act as server)" }, { flag: "-z", desc: "Zero-I/O mode for port scanning" }, { flag: "-v", desc: "Verbose output" }, { flag: "-u", desc: "Use UDP instead of TCP" }, { flag: "-w N", desc: "Timeout N seconds for connections" }] },

  { cmd: "tcpdump", desc: "Capture/analyze network packets", usage: "tcpdump [opts] [-i iface]", ex: "tcpdump -i eth0 port 80", cat: "Networking",
    purpose: "Captures and analyzes network packets in real time. The most fundamental network debugging tool on Linux. Output can be saved to .pcap files for analysis in Wireshark.",
    params: [],
    options: [{ flag: "-i", desc: "Specify network interface (e.g. -i eth0)" }, { flag: "-w", desc: "Write packets to a .pcap file" }, { flag: "-r", desc: "Read from a .pcap file" }, { flag: "-n", desc: "No DNS resolution" }, { flag: "-c N", desc: "Capture N packets then stop" }, { flag: "port N", desc: "Filter by port number" }, { flag: "host IP", desc: "Filter by host IP address" }] },

  { cmd: "df", desc: "Disk space usage of filesystems", usage: "df [options]", ex: "df -h", cat: "Disk & Storage",
    purpose: "Reports disk space usage for mounted filesystems showing total, used, and available space. Essential for monitoring disk capacity and identifying full partitions.",
    params: [{ name: "filesystem", desc: "Optional specific filesystem or mount point to check" }],
    options: [{ flag: "-h", desc: "Human-readable sizes (KB, MB, GB)" }, { flag: "-T", desc: "Show filesystem type" }, { flag: "-i", desc: "Show inode usage instead of blocks" }, { flag: "-a", desc: "Include pseudo/duplicate/inaccessible filesystems" }, { flag: "--total", desc: "Show grand total at bottom" }] },

  { cmd: "mount", desc: "Mount a filesystem", usage: "mount [opts] dev mnt", ex: "mount /dev/sdb1 /mnt", cat: "Disk & Storage",
    purpose: "Attaches a filesystem (disk partition, ISO, NFS share, etc.) to a directory in the filesystem tree. With no arguments, shows all currently mounted filesystems.",
    params: [{ name: "dev", desc: "Block device, UUID, or network share to mount" }, { name: "mnt", desc: "Mount point directory (must exist)" }],
    options: [{ flag: "-t", desc: "Filesystem type (ext4, ntfs, nfs, tmpfs)" }, { flag: "-o", desc: "Mount options (ro, rw, noexec, loop)" }, { flag: "-r", desc: "Mount read-only" }, { flag: "-a", desc: "Mount all filesystems in /etc/fstab" }, { flag: "--bind", desc: "Bind mount a directory to another location" }] },

  { cmd: "umount", desc: "Unmount a filesystem", usage: "umount mnt", ex: "umount /mnt/usb", cat: "Disk & Storage",
    purpose: "Detaches a mounted filesystem from the directory tree. The filesystem must not be in use (no open files or processes using it) or the command will fail.",
    params: [{ name: "mnt", desc: "Mount point or device to unmount" }],
    options: [{ flag: "-f", desc: "Force unmount (use for stuck NFS mounts)" }, { flag: "-l", desc: "Lazy unmount — detach when no longer busy" }, { flag: "-a", desc: "Unmount all filesystems in /etc/mtab" }] },

  { cmd: "lsblk", desc: "List block devices", usage: "lsblk [options]", ex: "lsblk -f", cat: "Disk & Storage",
    purpose: "Lists all block devices (disks, partitions, loop devices) in a tree format. Shows device names, sizes, mount points, and filesystem types at a glance.",
    params: [],
    options: [{ flag: "-f", desc: "Show filesystem type and UUID" }, { flag: "-o", desc: "Specify output columns (e.g. -o NAME,SIZE,TYPE)" }, { flag: "-d", desc: "Don't show slave/partition devices" }, { flag: "-p", desc: "Print full device paths" }] },

  { cmd: "fdisk", desc: "Partition table manipulator", usage: "fdisk /dev/sdX", ex: "fdisk -l /dev/sda", cat: "Disk & Storage",
    purpose: "Creates, deletes, and modifies disk partition tables. Interactive menu-driven interface. Use -l to just list partitions without entering interactive mode.",
    params: [{ name: "/dev/sdX", desc: "Block device to partition (e.g. /dev/sda, /dev/nvme0n1)" }],
    options: [{ flag: "-l", desc: "List partition tables (non-interactive)" }, { flag: "-u", desc: "Show sizes in sectors" }, { flag: "-s", desc: "Print size of partition in blocks" }] },

  { cmd: "dd", desc: "Convert and copy files/disks", usage: "dd if=src of=dest", ex: "dd if=/dev/sda of=img.iso", cat: "Disk & Storage",
    purpose: "Low-level copying and conversion of raw data. Used for disk imaging, creating bootable USBs, wiping drives, and benchmarking I/O. Extremely powerful — use with caution.",
    params: [{ name: "if=", desc: "Input file or device (source)" }, { name: "of=", desc: "Output file or device (destination)" }],
    options: [{ flag: "bs=", desc: "Block size (e.g. bs=4M)" }, { flag: "count=", desc: "Number of blocks to copy" }, { flag: "status=progress", desc: "Show progress during copy" }, { flag: "conv=sync", desc: "Pad blocks with zeros if needed" }, { flag: "conv=noerror", desc: "Continue on read errors" }] },

  { cmd: "uname", desc: "Print system information", usage: "uname [options]", ex: "uname -a", cat: "System Info",
    purpose: "Prints system information including kernel name, hostname, kernel release/version, machine hardware, and operating system. Useful for identifying the system environment in scripts.",
    params: [],
    options: [{ flag: "-a", desc: "Print all available information" }, { flag: "-s", desc: "Kernel name" }, { flag: "-r", desc: "Kernel release version" }, { flag: "-v", desc: "Kernel version (build date)" }, { flag: "-m", desc: "Machine hardware name (e.g. x86_64)" }, { flag: "-n", desc: "Network hostname" }, { flag: "-o", desc: "Operating system name" }] },

  { cmd: "uptime", desc: "Show system uptime and load", usage: "uptime", ex: "uptime", cat: "System Info",
    purpose: "Displays current time, how long the system has been running, number of users, and CPU load averages for 1, 5, and 15 minute intervals.",
    params: [],
    options: [{ flag: "-p", desc: "Show uptime in human-readable format" }, { flag: "-s", desc: "Show date/time system last booted" }] },

  { cmd: "free", desc: "Display memory usage", usage: "free [options]", ex: "free -h", cat: "System Info",
    purpose: "Displays total, used, and available physical and swap memory. The 'available' column is more accurate than 'free' for determining usable memory as it accounts for cache/buffers.",
    params: [],
    options: [{ flag: "-h", desc: "Human-readable output (KB, MB, GB)" }, { flag: "-m", desc: "Output in megabytes" }, { flag: "-g", desc: "Output in gigabytes" }, { flag: "-s N", desc: "Continuously poll every N seconds" }, { flag: "-t", desc: "Show total row (RAM + swap)" }] },

  { cmd: "dmesg", desc: "Kernel ring buffer messages", usage: "dmesg [options]", ex: "dmesg | tail -50", cat: "System Info",
    purpose: "Displays kernel and driver messages from the ring buffer. Essential for diagnosing hardware issues, boot problems, and device errors. Messages are lost on reboot.",
    params: [],
    options: [{ flag: "-H", desc: "Human-readable output with timestamps" }, { flag: "-T", desc: "Print human-readable timestamps" }, { flag: "-l", desc: "Filter by log level (err, warn, info)" }, { flag: "-f", desc: "Filter by facility (kern, daemon)" }, { flag: "-w", desc: "Follow — print new messages as they arrive" }] },

  { cmd: "lscpu", desc: "Display CPU info", usage: "lscpu", ex: "lscpu", cat: "System Info",
    purpose: "Displays detailed CPU architecture information including number of CPUs, cores, threads, CPU family, model, cache sizes, and supported instruction sets.",
    params: [],
    options: [{ flag: "-e", desc: "Show extended CPU info per-CPU" }, { flag: "-p", desc: "Parseable output format" }, { flag: "-J", desc: "JSON output format" }] },

  { cmd: "env", desc: "Print environment variables", usage: "env", ex: "env | grep PATH", cat: "System Info",
    purpose: "Displays all environment variables in the current shell, or runs a command in a modified environment. Useful for debugging and scripting.",
    params: [],
    options: [{ flag: "-i", desc: "Run with an empty environment" }, { flag: "-u VAR", desc: "Remove variable from environment" }, { flag: "VAR=val cmd", desc: "Run command with modified environment variable" }] },

  { cmd: "useradd", desc: "Create a new user", usage: "useradd [options] user", ex: "useradd -m -s /bin/bash bob", cat: "User Management",
    purpose: "Creates a new user account. By default doesn't create a home directory or set a password. Use -m for home directory creation and passwd afterward to set a password.",
    params: [{ name: "user", desc: "Username for the new account" }],
    options: [{ flag: "-m", desc: "Create home directory (/home/username)" }, { flag: "-s", desc: "Set login shell (e.g. /bin/bash)" }, { flag: "-G", desc: "Add to supplementary group(s)" }, { flag: "-u", desc: "Specify UID number" }, { flag: "-d", desc: "Set custom home directory path" }, { flag: "-c", desc: "Set comment/GECOS (full name)" }, { flag: "-r", desc: "Create a system account (no home dir, low UID)" }] },

  { cmd: "usermod", desc: "Modify a user account", usage: "usermod [options] user", ex: "usermod -aG sudo bob", cat: "User Management",
    purpose: "Modifies an existing user account's properties. The -aG option (append to group) is the most common usage for granting additional permissions.",
    params: [{ name: "user", desc: "Username of the account to modify" }],
    options: [{ flag: "-aG", desc: "Append user to supplementary group(s)" }, { flag: "-s", desc: "Change login shell" }, { flag: "-d", desc: "Change home directory" }, { flag: "-l", desc: "Change login name" }, { flag: "-L", desc: "Lock the account" }, { flag: "-U", desc: "Unlock the account" }] },

  { cmd: "passwd", desc: "Change user password", usage: "passwd [user]", ex: "passwd bob", cat: "User Management",
    purpose: "Changes a user's password. Without arguments, changes the current user's password. Root can change any user's password. Also manages account locking/expiry.",
    params: [{ name: "user", desc: "Username to change password for (root only for other users)" }],
    options: [{ flag: "-l", desc: "Lock the account" }, { flag: "-u", desc: "Unlock the account" }, { flag: "-d", desc: "Delete password (no password required)" }, { flag: "-e", desc: "Expire password immediately (force change on next login)" }] },

  { cmd: "sudo", desc: "Execute as another user", usage: "sudo [cmd]", ex: "sudo systemctl restart nginx", cat: "User Management",
    purpose: "Runs a command with the security privileges of another user (typically root). Controlled by /etc/sudoers. Logs all usage, making it safer and more auditable than 'su'.",
    params: [{ name: "cmd", desc: "Command to execute with elevated privileges" }],
    options: [{ flag: "-u user", desc: "Run as a specific user instead of root" }, { flag: "-i", desc: "Simulate initial login shell of target user" }, { flag: "-s", desc: "Open a shell as target user" }, { flag: "-l", desc: "List allowed commands for current user" }, { flag: "-k", desc: "Invalidate cached credentials (re-prompt password)" }, { flag: "-v", desc: "Extend sudo timeout without running a command" }] },

  { cmd: "apt", desc: "Debian/Ubuntu package manager", usage: "apt [command] pkg", ex: "apt install nginx", cat: "Package Management",
    purpose: "The high-level package management tool for Debian-based systems. Handles dependency resolution, installs, upgrades, and removal of packages from configured repositories.",
    params: [{ name: "command", desc: "Action: install, remove, update, upgrade, search, show" }, { name: "pkg", desc: "Package name(s) to install/remove" }],
    options: [{ flag: "install", desc: "Install a package" }, { flag: "remove", desc: "Remove a package (keep config files)" }, { flag: "purge", desc: "Remove package and config files" }, { flag: "update", desc: "Refresh package index from repositories" }, { flag: "upgrade", desc: "Upgrade all installed packages" }, { flag: "-y", desc: "Automatically answer yes to prompts" }] },

  { cmd: "systemctl", desc: "Control systemd services", usage: "systemctl [cmd] service", ex: "systemctl restart nginx", cat: "Service Management",
    purpose: "The primary interface to systemd — the init system and service manager. Controls starting, stopping, enabling, and inspecting services and system states.",
    params: [{ name: "cmd", desc: "Action: start, stop, restart, reload, enable, disable, status" }, { name: "service", desc: "Name of the systemd unit/service (e.g. nginx, sshd)" }],
    options: [{ flag: "start", desc: "Start a service immediately" }, { flag: "stop", desc: "Stop a service immediately" }, { flag: "restart", desc: "Stop then start a service" }, { flag: "reload", desc: "Reload configuration without restart" }, { flag: "enable", desc: "Enable service to start at boot" }, { flag: "disable", desc: "Disable service from starting at boot" }, { flag: "status", desc: "Show service status and recent log output" }, { flag: "is-active", desc: "Check if a service is running" }] },

  { cmd: "journalctl", desc: "Query systemd journal logs", usage: "journalctl [options]", ex: "journalctl -u nginx -f", cat: "Service Management",
    purpose: "Queries the systemd journal for logs from services, the kernel, and the boot process. Supports filtering by service, time, priority, and more.",
    params: [],
    options: [{ flag: "-u", desc: "Filter by service unit name" }, { flag: "-f", desc: "Follow: show new log entries as they arrive" }, { flag: "-n N", desc: "Show last N lines" }, { flag: "-b", desc: "Show logs from current boot" }, { flag: "-p", desc: "Filter by priority (err, warning, info, debug)" }, { flag: "--since", desc: "Show entries from a date/time" }, { flag: "--until", desc: "Show entries up to a date/time" }] },

  { cmd: "crontab", desc: "Manage cron jobs", usage: "crontab [-e|-l|-r]", ex: "crontab -e", cat: "Service Management",
    purpose: "Manages the cron job table for the current user. Cron jobs are scheduled commands that run automatically at specified times using the format: minute hour day month weekday command.",
    params: [],
    options: [{ flag: "-e", desc: "Edit crontab in default editor" }, { flag: "-l", desc: "List current crontab entries" }, { flag: "-r", desc: "Remove/delete the crontab" }, { flag: "-u user", desc: "Operate on another user's crontab (root only)" }] },

  { cmd: "tar", desc: "Archive files", usage: "tar [options] file", ex: "tar -czvf out.tgz dir/", cat: "Archives",
    purpose: "Creates, extracts, and lists archive files. Commonly used with gzip (-z) or bzip2 (-j) compression. The go-to tool for packaging directories for backup or transfer.",
    params: [{ name: "file", desc: "Archive filename to create or extract" }, { name: "dir", desc: "Directory or file(s) to archive" }],
    options: [{ flag: "-c", desc: "Create a new archive" }, { flag: "-x", desc: "Extract files from archive" }, { flag: "-t", desc: "List contents of archive" }, { flag: "-v", desc: "Verbose — list files as they are processed" }, { flag: "-f", desc: "Specify archive filename (must be last flag)" }, { flag: "-z", desc: "Compress with gzip (.tgz / .tar.gz)" }, { flag: "-j", desc: "Compress with bzip2 (.tar.bz2)" }, { flag: "-J", desc: "Compress with xz (.tar.xz)" }, { flag: "-C", desc: "Extract to a specific directory" }] },

  { cmd: "gzip", desc: "Compress files", usage: "gzip [options] file", ex: "gzip -k largefile", cat: "Archives",
    purpose: "Compresses files using the gzip algorithm. Replaces the original file with a .gz compressed version by default. Use -k to keep the original file.",
    params: [{ name: "file", desc: "File to compress" }],
    options: [{ flag: "-k", desc: "Keep original file after compression" }, { flag: "-d", desc: "Decompress (same as gunzip)" }, { flag: "-r", desc: "Recursively compress directory contents" }, { flag: "-1 to -9", desc: "Compression level (1=fast, 9=best)" }, { flag: "-l", desc: "List compressed file info" }] },

  { cmd: "zip", desc: "Package and compress files", usage: "zip archive.zip files", ex: "zip -r out.zip dir/", cat: "Archives",
    purpose: "Creates ZIP archives compatible with Windows and other systems. Supports compression, encryption, and adding/updating files in existing archives.",
    params: [{ name: "archive.zip", desc: "Output ZIP archive filename" }, { name: "files", desc: "Files or directories to add to the archive" }],
    options: [{ flag: "-r", desc: "Recursively add directory contents" }, { flag: "-e", desc: "Encrypt archive with password" }, { flag: "-u", desc: "Update existing archive entries" }, { flag: "-d", desc: "Delete entries from archive" }, { flag: "-l", desc: "List archive contents" }] },

  { cmd: "unzip", desc: "Extract zip archives", usage: "unzip archive.zip", ex: "unzip -d /tmp out.zip", cat: "Archives",
    purpose: "Extracts files from ZIP archives. Can list archive contents, test integrity, or extract to a specific destination directory.",
    params: [{ name: "archive.zip", desc: "ZIP file to extract" }],
    options: [{ flag: "-d dir", desc: "Extract to a specific directory" }, { flag: "-l", desc: "List archive contents without extracting" }, { flag: "-t", desc: "Test archive integrity" }, { flag: "-o", desc: "Overwrite files without prompting" }, { flag: "-n", desc: "Never overwrite existing files" }] },

  { cmd: "echo", desc: "Display a line of text", usage: "echo [options] text", ex: "echo $PATH", cat: "Shell & Scripting",
    purpose: "Writes arguments to standard output followed by a newline. Used in scripts for output, variable inspection, and writing content to files via redirection.",
    params: [{ name: "text", desc: "String or variables to print" }],
    options: [{ flag: "-n", desc: "Do not print trailing newline" }, { flag: "-e", desc: "Enable interpretation of backslash escapes (\\n, \\t)" }, { flag: "-E", desc: "Disable backslash escape interpretation (default)" }] },

  { cmd: "export", desc: "Set environment variables", usage: "export VAR=value", ex: "export PATH=$PATH:/opt/bin", cat: "Shell & Scripting",
    purpose: "Marks a shell variable for export to child processes' environments. Without export, variables are local to the current shell and not inherited by subprocesses.",
    params: [{ name: "VAR=value", desc: "Variable name and value to export" }],
    options: [{ flag: "-n", desc: "Un-export a variable (remove export mark)" }, { flag: "-p", desc: "List all exported variables" }] },

  { cmd: "history", desc: "Show command history", usage: "history [N]", ex: "history | grep ssh", cat: "Shell & Scripting",
    purpose: "Displays the list of previously executed commands in the current shell session. Combine with grep to search history. Use !N to re-run command number N.",
    params: [{ name: "N", desc: "Number of recent commands to show (optional)" }],
    options: [{ flag: "-c", desc: "Clear the history list" }, { flag: "-d N", desc: "Delete history entry at offset N" }, { flag: "-w", desc: "Write history to ~/.bash_history" }, { flag: "-r", desc: "Read history from file" }] },

  { cmd: "alias", desc: "Create command aliases", usage: "alias name='cmd'", ex: "alias ll='ls -la'", cat: "Shell & Scripting",
    purpose: "Creates shorthand names for commands or command strings. Aliases only persist in the current shell session unless added to ~/.bashrc or ~/.zshrc.",
    params: [{ name: "name", desc: "Alias name to create" }, { name: "cmd", desc: "Command string the alias expands to" }],
    options: [{ flag: "(none)", desc: "List all current aliases when called without arguments" }] },

  { cmd: "which", desc: "Locate a command", usage: "which cmd", ex: "which python3", cat: "Shell & Scripting",
    purpose: "Searches the directories in PATH and returns the full path of the executable that would run when the command name is typed. Useful for resolving which version of a tool is active.",
    params: [{ name: "cmd", desc: "Command name to locate" }],
    options: [{ flag: "-a", desc: "Print all matching paths, not just the first" }] },

  { cmd: "openssl", desc: "OpenSSL crypto toolkit", usage: "openssl [command]", ex: "openssl s_client -connect host:443", cat: "Security",
    purpose: "A versatile cryptography toolkit for SSL/TLS, certificate management, encryption, and hashing. Used for generating keys, signing certificates, and debugging HTTPS connections.",
    params: [{ name: "command", desc: "Subcommand: s_client, genrsa, req, x509, enc, dgst, rand" }],
    options: [{ flag: "s_client", desc: "Debug TLS/SSL connections to a server" }, { flag: "genrsa", desc: "Generate an RSA private key" }, { flag: "req", desc: "Create a certificate signing request (CSR)" }, { flag: "x509", desc: "Manage X.509 certificates" }, { flag: "enc", desc: "Encrypt/decrypt files" }, { flag: "dgst", desc: "Compute message digest / hash" }] },

  { cmd: "ssh-keygen", desc: "Generate SSH key pairs", usage: "ssh-keygen [options]", ex: "ssh-keygen -t ed25519", cat: "Security",
    purpose: "Generates public/private SSH authentication key pairs. Newer algorithms like ed25519 and ecdsa are preferred over older RSA. Public key goes on servers; private key stays local.",
    params: [],
    options: [{ flag: "-t", desc: "Key type: rsa, ecdsa, ed25519, dsa" }, { flag: "-b", desc: "Key size in bits (e.g. -b 4096 for RSA)" }, { flag: "-f", desc: "Output filename for key pair" }, { flag: "-C", desc: "Comment label (e.g. email address)" }, { flag: "-N", desc: "Passphrase for private key (use '' for none)" }, { flag: "-p", desc: "Change passphrase of existing private key" }] },

  { cmd: "ufw", desc: "Uncomplicated Firewall", usage: "ufw [command]", ex: "ufw allow 22/tcp", cat: "Security",
    purpose: "A user-friendly frontend for iptables. Simplifies firewall rule management on Ubuntu/Debian systems. Rules persist across reboots when enabled.",
    params: [{ name: "command", desc: "Action: enable, disable, allow, deny, status, reset" }],
    options: [{ flag: "enable", desc: "Enable the firewall" }, { flag: "disable", desc: "Disable the firewall" }, { flag: "allow PORT", desc: "Allow incoming traffic on a port" }, { flag: "deny PORT", desc: "Deny incoming traffic on a port" }, { flag: "status verbose", desc: "Show detailed firewall rules" }, { flag: "delete N", desc: "Delete rule number N" }] },

  { cmd: "sha256sum", desc: "Compute SHA256 checksum", usage: "sha256sum file", ex: "sha256sum /iso/ubuntu.iso", cat: "Security",
    purpose: "Computes and verifies SHA256 cryptographic checksums. Used to verify file integrity after downloads or transfers. More secure than MD5 for integrity checking.",
    params: [{ name: "file", desc: "File(s) to compute checksum for" }],
    options: [{ flag: "-c", desc: "Check checksums against a checksum file" }, { flag: "-b", desc: "Read in binary mode" }, { flag: "--tag", desc: "Create BSD-style checksum output" }] },

  { cmd: "man", desc: "Display manual page", usage: "man [section] cmd", ex: "man 5 passwd", cat: "Miscellaneous",
    purpose: "Displays the manual (man) page for a command or system call. Man pages are the definitive reference for Linux commands, organized into numbered sections.",
    params: [{ name: "section", desc: "Optional section number (1=commands, 5=files, 8=admin)" }, { name: "cmd", desc: "Command or topic to look up" }],
    options: [{ flag: "-k", desc: "Search man pages by keyword (like apropos)" }, { flag: "-f", desc: "One-line description of a command" }, { flag: "-a", desc: "Show all matching pages across sections" }, { flag: "-P pager", desc: "Use specified pager (e.g. -P less)" }] },

  { cmd: "watch", desc: "Execute a program periodically", usage: "watch [-n N] cmd", ex: "watch -n 2 df -h", cat: "Miscellaneous",
    purpose: "Repeatedly runs a command at a specified interval and displays the output full-screen, highlighting differences between updates. Great for monitoring changing system state.",
    params: [{ name: "cmd", desc: "Command to run and display repeatedly" }],
    options: [{ flag: "-n N", desc: "Update interval in seconds (default: 2)" }, { flag: "-d", desc: "Highlight differences between updates" }, { flag: "-t", desc: "Turn off the header line" }, { flag: "-e", desc: "Exit if command has a non-zero return" }, { flag: "-g", desc: "Exit when output changes" }] },

  { cmd: "shutdown", desc: "Shutdown or restart system", usage: "shutdown [opts] time", ex: "shutdown -h now", cat: "Miscellaneous",
    purpose: "Brings the system down in a safe way. Notifies logged-in users and prevents new logins before powering off or rebooting. Preferred over 'halt' or 'reboot' for graceful shutdown.",
    params: [{ name: "time", desc: "When to shutdown: 'now', '+N' (minutes), or HH:MM" }],
    options: [{ flag: "-h", desc: "Halt/power off after shutdown" }, { flag: "-r", desc: "Reboot after shutdown" }, { flag: "-c", desc: "Cancel a pending shutdown" }, { flag: "-k", desc: "Send warning message only, don't actually shutdown" }] },

  { cmd: "reboot", desc: "Reboot the system", usage: "reboot", ex: "sudo reboot", cat: "Miscellaneous",
    purpose: "Immediately reboots the system. Equivalent to 'shutdown -r now'. Always use sudo or run as root.",
    params: [],
    options: [{ flag: "-f", desc: "Force reboot without calling shutdown" }, { flag: "--halt", desc: "Halt instead of reboot" }] },

  { cmd: "sleep", desc: "Delay for a specified time", usage: "sleep N[s|m|h]", ex: "sleep 5 && reboot", cat: "Miscellaneous",
    purpose: "Pauses execution for a specified amount of time. Used in shell scripts to introduce delays between commands.",
    params: [{ name: "N", desc: "Number of time units to sleep" }],
    options: [{ flag: "s", desc: "Seconds (default)" }, { flag: "m", desc: "Minutes" }, { flag: "h", desc: "Hours" }, { flag: "d", desc: "Days" }] },
];

export const CAT_COLORS = {
  "File & Directory": "#3b82f6", "File Viewing": "#06b6d4", "Text Processing": "#8b5cf6",
  "Permissions": "#f59e0b", "Process Management": "#ef4444", "Networking": "#10b981",
  "Disk & Storage": "#f97316", "System Info": "#6366f1", "User Management": "#ec4899",
  "Package Management": "#84cc16", "Service Management": "#14b8a6", "Archives": "#a78bfa",
  "Shell & Scripting": "#fbbf24", "Security": "#f43f5e", "Miscellaneous": "#94a3b8",
};
