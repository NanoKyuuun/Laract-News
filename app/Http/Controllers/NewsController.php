<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsCollection;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::latest()->paginate(9));
        return Inertia::render('Home', [
            'title' => 'welcome',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
        ]);
        $news = new News();
        $news->title = $request->title;
        $news->content = $request->content;
        $news->category = $request->category;
        $news->author = auth()->user()->name;
        $news->save();

        return redirect()->back()->with('message', 'News created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = News::where('author', auth()->user()->name)->latest()->get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, $id)
    {
        $myNews = News::find($id);
        return Inertia::render('EditNews', [
            'myNews' => $myNews
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news,$id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
        ]);
        News::where('id', $id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category
        ]);
        return redirect('/news')->with('message', 'News update successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news, $id)
    {
        News::destroy($id);
        return redirect('/news')->with('message', 'This news has been deleted!');
    }
}