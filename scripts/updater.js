async function fetchLatestCommitHash() {
	const REPO_OWNER = "puksh"; // Replace with your GitHub username
	const REPO_NAME = "kot.li-webpage"; // Replace with your GitHub repository name

	try {
		const response = await fetch(
			`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`,
		);
		const commits = await response.json();

		if (commits.length > 0) {
			// Get the latest commit hash and take the first 6 characters
			const latestCommitHash = commits[0].sha.substring(0, 6);
			return latestCommitHash;
		} else {
			throw new Error("No commits found.");
		}
	} catch (error) {
		console.error("Error fetching latest commit hash:", error);
	}
}

async function checkForUpdates() {
	const storedCommitHash = localStorage.getItem("latestCommitHash");
	const latestCommitHash = await fetchLatestCommitHash();

	if (latestCommitHash && latestCommitHash !== storedCommitHash) {
		// Update the local storage with the new commit hash
		localStorage.setItem("latestCommitHash", latestCommitHash);

		// Log the update
		console.log(`Updated commit hash: ${latestCommitHash}`);

		// Perform a full refresh to get the latest version
		window.location.reload(true);
	}
}

checkForUpdates();
