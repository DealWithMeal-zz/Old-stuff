using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using SimpleJSON;

public class MainWorker : MonoBehaviour
{

    public InputField searchInput;
    public GameObject contentPanel;
    public GameObject sampleText;
    public GameObject status;
    public GameObject scrollView;

    string baseURL = "https://external.api.yle.fi/v1/programs/items.json";
    string keys = "?app_id=5312c4ac&app_key=a2c15697bb075a605f02196d8a2755b7";

    ScrollRect scrollRect;

    int offset = 0;
    int limit = 10;
    string lastSearch = "";

    //not to have few searches at one time
    private bool canSearch = false;

    void Start()
    {

        if (searchInput && contentPanel && sampleText && status && scrollView)
        {
            searchInput.onEndEdit.AddListener(submitSearch);
            scrollRect = scrollView.GetComponent<ScrollRect>();
            scrollRect.onValueChanged.AddListener(checkScroll);
        }
        else
        {
            throw new System.ArgumentException("One of public variables is null"); ;
        }
    }
    private void submitSearch(string arg0)
    {
        canSearch = true;
        offset = 0;
        lastSearch = arg0;
        startSearch(arg0, true);
    }

    private void startSearch(string q, bool clear)
    {
        if (clear)
        {
            setStatus("Working...");
            clearList();
        }

        WWW www = new WWW(baseURL + keys + "&offset=" + offset + "&limit=" + limit + "&q=" + q);
        StartCoroutine(WaitForRequest(www));
    }

    private void checkScroll(Vector2 arg0)
    {
        if(arg0.y <= 0)
        {
            if(canSearch)
            {
                startSearch(lastSearch, false);
                canSearch = false;
            }
        }
    }

    IEnumerator WaitForRequest(WWW www)
    {
        yield return www;

        if (www.error == null)
        {
            Debug.Log("WWW Ok!");
            updateFeed(www.text);
            offset += limit;
        }
        else
        {
            setStatus("Error during request. More details in console");
            Debug.Log("WWW Error: " + www.error);
            canSearch = true;
        }
    }

    private void updateFeed(string json)
    {
        var N = JSON.Parse(json);

        if ((N["data"].Count == 0) && (contentPanel.transform.childCount == 1))
        {
            setStatus("No items found");
        } else
        {
            hideStatus();

            for (int i = 0; i < N["data"].Count; i++)
            {
                addLineToFeed(N["data"][i]["title"][0]);
            }
        }

        canSearch = true;
    }

    private void addLineToFeed(string text)
    {
        GameObject newLine = Instantiate(sampleText) as GameObject;
        newLine.GetComponent<Text>().text = text;
        newLine.transform.parent = contentPanel.transform;
        newLine.transform.localScale = new Vector3(1, 1, 1);
    }

    private void clearList()
    {
        foreach (Transform child in contentPanel.transform)
        {
            if(child.gameObject != status.gameObject)
            {
                Destroy(child.gameObject);
            }
        }
    }

    private void setStatus(string text)
    {
        status.GetComponent<Text>().text = text;
        showStatus();
    }

    private void hideStatus()
    {
        status.SetActive(false);
    }

    private void showStatus()
    {
        status.SetActive(true);
    }
}
