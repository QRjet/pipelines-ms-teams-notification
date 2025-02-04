export function createMessageCard(
  notificationSummary: string,
  notificationColor: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string,
  prUrl?: string
): any {
  let avatar_url =
    'https://www.gravatar.com/avatar/05b6d8cc7c662bf81e01b39254f88a48?d=identicon'
  if (author) {
    if (author.avatar_url) {
      avatar_url = author.avatar_url
    }
  }
  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: notificationColor,
    title: notificationSummary,
    potentialAction: [
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/actions/runs/${runId}`],
        '@type': 'ViewAction',
        name: 'View Workflow Run'
      },
      {
        '@context': 'http://schema.org',
        target: [commit.data.html_url],
        '@type': 'ViewAction',
        name: 'View Commit Changes'
      },
      ...( 
        prUrl 
        ? [{
            '@context': 'http://schema.org',
            target: [prUrl],
            '@type': 'ViewAction',
            name: 'View PR'
          }]
        : []
      )
    ]
  }
  return messageCard
}
